# PIX BRCode Generation Standards - Banco Central Compliance

## Overview
PIX BRCode follows the EMV QR Code (EMV QRCPS) standard with TLV (Tag-Length-Value) encoding. This document summarizes the correct implementation based on multiple reference implementations and Banco Central do Brasil (BCB) standards.

Reference: [Official BCB BR Code Manual](https://www.bcb.gov.br/content/estabilidadefinanceira/spb_docs/ManualBRCode.pdf)

---

## 1. TLV (Tag-Length-Value) Structure

### Core Format: `ID + Length + Value`

Each data field follows this exact structure:
- **ID (2 digits)**: Identifies the field type (00-62, with 63 reserved for CRC)
- **Length (2 digits)**: Number of characters/bytes in the value (00-99)
- **Value**: The actual data (variable length based on the Length field)

### Example:
```
Type: ID=00, Length=02, Value='01'
Encoded: '000201'

Type: ID=52, Length=04, Value='0000'
Encoded: '520400'
```

---

## 2. Complete Payload Structure (Static PIX)

The payload consists of mandatory and optional data fields, each with an ID and their own TLV encoding:

### Mandatory Fields:

| ID | Name | Value | Example |
|:--|:--|:--|:--|
| 00 | **Payload Format Indicator** | Always '01' | `000201` |
| 01 | **Point of Initiation Method** | '11' (static) or '12' (dynamic/unique) | `010111` or `010212` |
| 26 | **Merchant Account Information** | Nested TLV with PIX details | See below |
| 52 | **Merchant Category Code** | '0000' for PIX | `520400` |
| 53 | **Transaction Currency** | '986' (BRL - Brazilian Real per ISO 4217) | `530393986` |
| 58 | **Country Code** | 'BR' | `580214BR` |
| 59 | **Merchant Name** | Up to 25 chars, no accents | `591JMEU%20NOME%20AQUI` |
| 60 | **Merchant City** | Up to 15 chars, no accents | `600SAO%20PAULO` |
| 62 | **Additional Data Field Template** | Nested TLV with transaction ID | See below |
| 63 | **CRC16 Checksum** | Calculated separately (LAST FIELD) | `6304XXXX` |

### Optional Fields:

| ID | Name | Value | Example |
|:--|:--|:--|:--|
| 54 | **Transaction Amount** | Decimal with 2 digits precision (e.g., '100.50') | `540510.50` |
| 61 | **Postal Code** | Up to 15 digits, numbers only | `6105XXXXX` |

---

## 3. Nested TLV: Merchant Account Information (ID=26)

Field 26 contains nested TLV structure:

```
26 | {length} | 00 11 BR.GOV.BCB.PIX 01 {key_length} {pix_key} 02 {desc_len} {description}
```

### Sub-fields:

| Sub-ID | Name | Value |
|:--|:--|:--|
| 00 | **GUI (Globally Unique Identifier)** | 'BR.GOV.BCB.PIX' (constant) |
| 01 | **PIX Key** | Email, CPF, CNPJ, Phone, or Random UUID |
| 02 | **Transaction Description (optional)** | Up to 25 chars |

### Example Structure:
```
Field 26 (Merchant Account Information):
26 {length}
   ├─ 0014BR.GOV.BCB.PIX (00 14 BR.GOV.BCB.PIX)
   ├─ 01{key_len}{pix_key}
   └─ 02{desc_len}{description}
```

### Nested TLV Example:
```
Key: "11999999999" (11 chars)
Description: "Pagamento" (9 chars)

Result: 0014BR.GOV.BCB.PIX011199999999990209Pagamento
Total field: 261(calculation)0014BR.GOV.BCB.PIX011199999999990209Pagamento
```

---

## 4. Nested TLV: Additional Data Field Template (ID=62)

Field 62 contains nested TLV for transaction reference:

```
62 | {length} | 05 {txid_length} {transaction_id} 50 {psi_length} {PSI_header}
```

### Sub-fields:

| Sub-ID | Name | Value | Rules |
|:--|:--|:--|:--|
| 05 | **Reference Label** | Transaction ID (txid) | 1-25 alphanumeric chars, no special chars |
| 50 | **Payment System Specific** | Nested EMV header | Always '00BR.GOV.BCB.BRCODE01' + version |

### Reference Label (05) Sub-structure:
- Max 25 characters
- Only alphanumeric: `[0-9a-zA-Z]`
- Example: `PGTO123` or `***` (for compatibility)

### PSI (50) Sub-structure:
```
50{length}
├─ 00{len}BR.GOV.BCB.BRCODE (Identifier)
└─ 01{len}1.0.0 (Version)
```

### Complete Example:
```
62{length}
├─ 05{txid_len}{transaction_id}        (e.g., 05 07 PGTO123)
└─ 50{psi_len}00{len}BR.GOV.BCB.BRCODE{01{len}1.0.0}
```

---

## 5. CRC16 Calculation (Field 63)

### Algorithm: CRC-16-CCITT-FFFF

**Parameters:**
- Polynomial: `0x1021`
- Initial Value: `0xFFFF`
- Reflection Input: `false`
- Reflection Output: `false`
- Final XOR: `0x0000`

### Implementation Steps:

1. **Build the complete payload** WITHOUT the CRC field
2. **Append `6304`** to the payload (this is the ID '63', length '04', which will be replaced)
3. **Calculate CRC16** over this entire string
4. **Result**: 4-character hexadecimal uppercase string
5. **Final field**: `6304` + CRC16_HEX

### JavaScript CRC16 Implementation:

```javascript
function numToHex(n, digits = 4) {
  const hex = n.toString(16).toUpperCase();
  if (digits) {
    return ('0'.repeat(digits) + hex).slice(-digits);
  }
  return (hex.length % 2 == 0) ? hex : `0${hex}`;
}

function CRC(str, invert = false) {
  const bytes = new TextEncoder().encode(str);
  
  // CRC-16-CCITT lookup table (256 entries)
  const crcTable = [
    0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7,
    0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef,
    0x1231, 0x0210, 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6,
    // ... (continue with all 256 table values)
  ];
  
  let crc = 0xFFFF;
  
  for (let i = 0; i < bytes.length; i++) {
    const c = bytes[i];
    const j = (c ^ (crc >> 8)) & 0xFF;
    crc = crcTable[j] ^ (crc << 8);
  }
  
  const answer = ((crc ^ 0) & 0xFFFF);
  const hex = numToHex(answer, 4);
  
  if (invert) return hex.slice(2) + hex.slice(0, 2);
  return hex;
}

// Usage:
const payload = "00020101021126580014br.gov.bcb...6304";
const crc16 = CRC(payload);
// Returns e.g., "A1B2"
```

### CRC Lookup Table (Full 256 entries):
See the complete implementation in [klawdyo/pix.js/src/crc.js](https://raw.githubusercontent.com/klawdyo/pix.js/main/src/crc.js)

---

## 6. Complete PIX Brcode Example

### Input:
```javascript
{
  key: "11999999999",              // PIX key
  name: "MINHA LOJA",              // Merchant name (max 25 chars, no accents)
  city: "SAO PAULO",               // Merchant city (max 15 chars, no accents)
  zipcode: "01310100",             // Optional postal code
  amount: 123.45,                  // Optional transaction amount
  txId: "PGTO001",                 // Optional transaction ID (1-25 alphanumeric)
  description: "Pagamento",        // Optional description (max 25 chars)
  isUnique: false                  // true='12' (unique/dynamic), false='11' (static)
}
```

### Generated Payload (Step by Step):

```
1. Payload Format Indicator (ID=00):
   000201

2. Point of Initiation Method (ID=01):
   010111  (or 010212 if isUnique=true)

3. Merchant Account Information (ID=26):
   26{length}0014BR.GOV.BCB.PIX01111199999999990209Pagamento
   Result: 26350014BR.GOV.BCB.PIX01111199999999990209Pagamento

4. Merchant Category Code (ID=52):
   520400

5. Transaction Currency (ID=53):
   530393986

6. Amount (ID=54): [OPTIONAL]
   540713123.45

7. Country Code (ID=58):
   580214BR

8. Merchant Name (ID=59):
   591DMINHA%20LOJA

9. Merchant City (ID=60):
   600SAO%20PAULO

10. Postal Code (ID=61): [OPTIONAL]
    610801310100

11. Additional Data Field Template (ID=62):
    621605077PGTO001501150BR.GOV.BCB.BRCODE01051.0.0

12. CRC16 (ID=63): [CALCULATED LAST]
    Placeholder: 6304
    
    Full payload without real CRC: 00020101021126350014BR.GOV.BCB.PIX01111199999999990209Pagamento520400530393986540713123.45580214BR591DMINHA%20LOJA600SAO%20PAULO610801310100621605077PGTO001501150BR.GOV.BCB.BRCODE01051.0.06304
    
    Append "6304" -> Calculate CRC16 -> Result: A1B2
    Final CRC field: 6304A1B2

COMPLETE BRCODE:
000201010211263500...6304A1B2
```

### Final Brcode Format (for QR Code generation):
```
00020101021126350014BR.GOV.BCB.PIX01111199999999990209Pagamento520400530393986540713123.45580214BR591DMINHA%20LOJA600SAO%20PAULO610801310100621605077PGTO001501150BR.GOV.BCB.BRCODE01051.0.06304A1B2
```

---

## 7. Key Implementation Rules

### String Sanitization:

1. **Remove Accents**: All text fields must have accents removed
   - Mapping: `á→a`, `é→e`, `ã→a`, etc.

2. **Format Numbers**: Amount values use 2 decimal places
   - `123.45` → `123.45` ✓
   - `123` → `123.00` ✗ (must have 2 decimals)

3. **PIX Key Sanitization**:
   - **CPF**: Remove formatting → `17080314054` (11 digits)
   - **CNPJ**: Remove formatting → `38262543000150` (14 digits)
   - **Phone**: Keep `+55` prefix → `+5511999999999`
   - **Email**: Use as-is → `user@example.com`
   - **Random UUID**: Use as-is → `3066362f-020c-4b46-9c1b-4ee3cf8a1bcc`

4. **Transaction ID (txId)**: Only alphanumeric, no special characters
   - Valid: `PGTO123`, `TX001`, `PAG05`
   - Invalid: `PAGTO-01`, `PAG.05`, `PAG@01` ✗

5. **Name/City**: Limit to max declared length, trim
   - Name: max 25 chars
   - City: max 15 chars

### Encoding:

- Use **UTF-8 encoding** for all strings
- Use **2-digit left-padded** zero for all IDs and lengths
- Use **uppercase hexadecimal** for CRC16 result

---

## 8. Validation Checklist

✓ Payload Format: Always `01`
✓ PIX Key: Valid (email, CPF, CNPJ, phone, or UUID)
✓ Merchant Name: 1-25 chars, without accents, trimmed
✓ Merchant City: 1-15 chars, without accents, trimmed
✓ Country Code: Always `BR`
✓ Currency: Always `986` (BRL)
✓ MCC: Always `0000` (for PIX)
✓ GUI: Always `BR.GOV.BCB.PIX`
✓ Amount (if present): Format with 2 decimals
✓ CRC16: Calculated over complete payload + `6304`
✓ All TLV fields: Correct ID + Length + Value

---

## 9. Reference Implementations

### JavaScript (klawdyo/pix.js)
- **GitHub**: https://github.com/klawdyo/pix.js
- **Key Files**: 
  - `src/pix.js` - Main payload generation
  - `src/crc.js` - CRC16 calculation
  - `src/utils.js` - Utility functions (padding, accent removal)

### Python (pybrcode)
- **GitHub**: https://github.com/ViniciusFM/pybrcode
- **Key Files**: `pybrcode/pix.py` - Complete TLV Data structure
- **CRC Algorithm**: CRC-16-CCITT-FFFF (Poly=0x1021, Init=0xFFFF)

### Dart (br_code_pix)
- **GitHub**: https://github.com/lucasveneno/br_code_pix
- **Features**: 
  - Static PIX generation
  - Dynamic PIX (Cob/CobV) support
  - Built-in CRC16-CCITT validation
  - Flutter widget support

---

## 10. Common Implementation Mistakes

❌ **Wrong CRC Calculation**:
- Not appending `6304` before calculation
- Using wrong polynomial or initial value
- Inverted byte order in result

❌ **TLV Structure Issues**:
- Length field in hexadecimal instead of decimal
- Incorrect nesting of sub-fields
- Missing required fields (00, 01, 26, 52, 53, 58, 59, 60, 62, 63)

❌ **Encoding Errors**:
- Not removing accents from name/city
- Using spaces instead of `%20` (or inconsistent encoding)
- Not left-padding ID and length to 2 digits

❌ **Data Validation**:
- txId longer than 25 chars or containing special characters
- Amount without 2 decimal places
- Name/city exceeding length limits
- Invalid PIX key format

---

## 11. BCB/Banco Central Official References

- 📄 [Official BR Code Manual (Portuguese)](https://www.bcb.gov.br/content/estabilidadefinanceira/spb_docs/ManualBRCode.pdf)
- 📄 [Manual in English](https://www.bcb.gov.br/content/config/Documents/BR_Code_MANUAL_Version_2_May_2020.pdf)
- 🔗 [EMV QRCode Specification](https://www.emvco.com/emv-technologies/qr-codes/)

---

## Summary Table: Field Reference

| ID | Field Name | Type | Required | Max Length | Format |
|:--|:--|:--|:--|:--|:--|
| 00 | Payload Format Indicator | String | Yes | 2 | '01' |
| 01 | Point of Initiation | String | Yes | 2 | '11' or '12' |
| 26 | Merchant Account Info | Nested TLV | Yes | 99 | 00+01+02 |
| 52 | Merchant Category Code | String | Yes | 4 | '0000' |
| 53 | Transaction Currency | String | Yes | 3 | '986' |
| 54 | Transaction Amount | String | No | 13 | '###.##' |
| 58 | Country Code | String | Yes | 2 | 'BR' |
| 59 | Merchant Name | String | Yes | 25 | No accents |
| 60 | Merchant City | String | Yes | 15 | No accents |
| 61 | Postal Code | String | No | 15 | Digits only |
| 62 | Additional Data | Nested TLV | Yes | 99 | 05+50 |
| 63 | CRC16 Checksum | String | Yes | 4 | Hex uppercase |

