# PIX BRCode Testing & Validation Guide

## Quick Validation Checklist

### Before Calculating CRC:
- [ ] Payload Format (ID=00) = `01` ✓
- [ ] Point of Initiation (ID=01) = `11` or `12` ✓
- [ ] Country Code (ID=58) = `BR` ✓
- [ ] Currency (ID=53) = `986` ✓
- [ ] MCC (ID=52) = `0000` ✓
- [ ] GUI (in ID=26) = `BR.GOV.BCB.PIX` ✓
- [ ] All text fields have NO accents ✓
- [ ] All text fields trimmed to max length ✓
- [ ] Amount (if present) = exactly 2 decimal places ✓
- [ ] Transaction ID (txId) = 1-25 alphanumeric, NO special chars ✓
- [ ] All ID fields = 2-digit zero-padded ✓
- [ ] All Length fields = 2-digit zero-padded ✓

### CRC Calculation:
- [ ] Complete payload built WITHOUT CRC field ✓
- [ ] Append `6304` to payload string before CRC ✓
- [ ] CRC algorithm = CRC-16-CCITT-FFFF ✓
- [ ] Result = 4-character UPPERCASE hexadecimal ✓
- [ ] Final field = `6304` + CRC_HEX ✓

---

## Step-by-Step Validation Process

### Step 1: Verify Each Field's TLV Structure

Example: Checking Field ID=59 (Merchant Name)

```
INPUT: name = "MINHA LOJA"

STEP A: Remove accents
  "MINHA LOJA" -> "MINHA LOJA" (no accents, but needs check)

STEP B: Trim to max length (25 chars for name)
  "MINHA LOJA" (10 chars) < 25 ✓

STEP C: Calculate TLV
  ID = "59" (2 digits)
  Length = 10 → "10" (2 digits, zero-padded)
  Value = "MINHA LOJA"
  Result: "591OMINHA LOJA"
         
VALIDATION:
  - ID has exactly 2 chars ✓
  - Length has exactly 2 chars ✓
  - Length value (10) matches actual value length (10) ✓
```

### Step 2: Verify Nested TLV (Merchant Account Info - ID=26)

Example: Building Field ID=26

```
INPUT:
  key = "11999999999"
  description = "Pagamento"

BUILD INNER FIELDS:
  1. ID=00 (GUI): "0014BR.GOV.BCB.PIX"
     - Length = 14 (BR.GOV.BCB.PIX)
     
  2. ID=01 (PIX Key): "01111199999999999"
     - Length = 11 (phone number)
     
  3. ID=02 (Description): "0209Pagamento"
     - Length = 9

COMBINE INNER FIELDS:
  "0014BR.GOV.BCB.PIX01111199999999990209Pagamento"
  
CALCULATE OUTER TLV:
  ID = "26"
  Length = ? → Count combined inner fields
    = 14 + 4 + 11 + 4 + 9 + 4 = 46
    = "46"
  Result: "264601..." (Total: "26" + "46" + content)
```

IMPORTANT: When you count the length of nested content:
- INCLUDE the inner field IDs and lengths
- INCLUDE the inner field values
- Example: `0014BR.GOV.BCB.PIX` = 4 chars for ID+length + 14 chars for value = 18 chars total

### Step 3: CRC Validation

```javascript
// WRONG - Most Common Mistakes:
const wrongCRC1 = CRC(completePayload); // ✗ Missing 6304 append
const wrongCRC2 = CRC(completePayload + '63'); // ✗ Only appended '63', not '6304'
const wrongCRC3 = crc(payload); // ✗ Wrong algorithm or wrong initial value

// CORRECT:
const correctPayload = "000201...6200...";  // Everything except CRC field
const crcInput = correctPayload + "6304";   // Append 6304 placeholder
const crcResult = CRC(crcInput);            // Pass complete string WITH 6304
const finalCRC = "6304" + crcResult;        // Replace 6304 with ID+length+crc
const finalPayload = correctPayload + finalCRC;
```

---

## Common Mistakes and Fixes

### ❌ Mistake #1: Wrong CRC Calculation

**Symptom**: QR code generated but gives "invalid PIX" when scanned

**Root Cause**: 
- Not appending `6304` before CRC
- Using different algorithm
- Bytes not UTF-8 encoded

**Fix**:
```javascript
// WRONG
const crc = CRC(payload);

// CORRECT
const crc = CRC(payload + "6304");
```

---

### ❌ Mistake #2: TLV Length Calculation Error

**Symptom**: Field reads as garbage or cuts off

**Root Cause**: 
- Calculating length BEFORE sanitization (removing accents changes length)
- Not counting inner TLV headers for nested fields
- Using wrong encoding (counting bytes vs characters)

**Fix**:
```javascript
// WRONG - Calculates length before sanitization
const len = value.length;
const sanitized = removeAccent(value);

// CORRECT - Sanitizes first, then calculates
const sanitized = removeAccent(value);
const len = sanitized.length;

// Then build TLV
return pad(id, 2) + pad(len, 2) + sanitized;
```

---

### ❌ Mistake #3: Accents Not Removed

**Symptom**: Barcode scans but shows garbled merchant name

**Root Cause**: 
- Using simple string replace instead of Unicode decomposition
- Testing with ASCII-only names

**Fix**:
```javascript
// Test with accented names:
const testNames = [
  "JOÃO SILVA",                    // Has ã and ã
  "JOSÉ & CIA",                    // Has é
  "AÇAÍ STORE",                    // Has Ç and Á and Í
];

// All must be converted:
removeAccent("JOÃO SILVA")  // → "JOAO SILVA" ✓
removeAccent("JOSÉ & CIA")  // → "JOSE & CIA" ✓
removeAccent("AÇAÍ STORE")  // → "ACAI STORE" ✓
```

---

### ❌ Mistake #4: PIX Key Not Sanitized

**Symptom**: PIX key field has wrong length or format

**Root Cause**: 
- Not removing formatting characters (dots, dashes, parentheses)
- Not detecting key type correctly

**Fix**:
```javascript
// WRONG - Doesn't sanitize
const cpfKey = "123.456.789-10";
// Length = 14 (includes dots and dash) ✗

// CORRECT - Removes formatting
const cpfKey = "12345678910";
// Length = 11 ✓

// Function to sanitize by type:
function sanitizeKey(key) {
  const type = getKeyType(key);
  
  if (type === 'cpf' || type === 'cnpj') {
    return key.replace(/[^0-9]+/g, '');  // Keep only digits
  } else if (type === 'phone') {
    return key.replace(/[^+0-9]+/g, ''); // Keep + and digits
  }
  
  return key; // Email and UUID as-is
}
```

---

### ❌ Mistake #5: Transaction ID Invalid

**Symptom**: Field ID=62 (Additional Data) has wrong length

**Root Cause**: 
- Transaction ID contains special characters: `PAG-05`, `PAG.05`, `PAG@05` ✗
- Transaction ID is too long (> 25 chars)

**Fix**:
```javascript
// WRONG - Contains special characters
const txId = "PAGTO-01";      // ✗ Contains dash
const txId = "PAGTO.01";      // ✗ Contains dot
const txId = "PAGTO@01";      // ✗ Contains @

// CORRECT - Only alphanumeric
const txId = "PAGTO01";       // ✓ Only letters and numbers
const txId = "TX001";         // ✓ Valid
const txId = "PGTOVENDA123";  // ✓ Valid

// Validation function:
function validateTxId(txId) {
  if (txId.length > 25) {
    throw new Error('txId max 25 characters');
  }
  if (!/^[0-9a-zA-Z\*]+$/.test(txId)) {
    throw new Error('txId only alphanumeric and asterisks');
  }
  return true;
}
```

---

### ❌ Mistake #6: Amount Format Wrong

**Symptom**: Amount field missing or incorrect digit count

**Root Cause**: 
- Amount not formatted with exactly 2 decimal places
- Amount converted to string without proper formatting
- Amount field omitted when should be included

**Fix**:
```javascript
// WRONG - Inconsistent formats
const amount = "100";           // ✗ No decimals
const amount = "100.5";         // ✗ Only 1 decimal
const amount = "100.5000";      // ✗ Too many decimals
const amount = "R$ 100.50";     // ✗ Contains currency symbol

// CORRECT - Always 2 decimals
const amount = "100.00";        // ✓
const amount = "100.50";        // ✓
const amount = "0.01";          // ✓ Valid minimum amount
const amount = "9999999.99";    // ✓ Valid maximum (13 digits including 2 decimals)

// Formatting function:
function formatAmount(amount) {
  if (!amount) return '';  // Optional field
  return Number.parseFloat(amount).toFixed(2);
}

// Usage:
formatAmount(100)       // → "100.00" ✓
formatAmount(100.5)     // → "100.50" ✓
formatAmount(100.555)   // → "100.56" ✓ (rounds to 2 decimals)
```

---

### ❌ Mistake #7: Field Lengths Not Zero-Padded

**Symptom**: Payload structure broken or parser fails

**Root Cause**: 
- Length values not padded to 2 digits: `1` instead of `01`
- ID values not padded: `5` instead of `05`

**Fix**:
```javascript
// WRONG - Not padded
const field = "5" + value.length + value;  // ✗ "512value"
const field = id + "2" + value;            // ✗ "592value" (92 instead of 02)

// CORRECT - All padded to 2 digits
const field = pad(5, 2) + pad(value.length, 2) + value;  // ✓ "0502value"
const field = pad(id, 2) + pad(len, 2) + value;          // ✓ "0502value"

// Pad function:
function pad(value, length = 2) {
  return String(value).padStart(length, '0');
}

// Examples:
pad(5, 2)         // → "05" ✓
pad(1, 2)         // → "01" ✓
pad(26, 2)        // → "26" ✓
pad(3, 2)         // → "03" ✓
```

---

## QR Code Scanning Validation

### Using an Online QR Decoder

1. Generate your BRCode string
2. Go to [zxing.org/w/decode.jspx](https://zxing.org/w/decode.jspx)
3. Select "Format: QR_CODE"
4. Generate QR from your BRCode (use any QR library)
5. Upload/paste the decoded result

### Expected Output Format:
```
00020101021126...540713123.45580214BR591DMINHA%20LOJA...6304A1B2
```

### Validation Checks:
- ✓ Typically 80-140 characters long
- ✓ Starts with `00020101`
- ✓ Ends with `6304` + 4 hex digits
- ✓ No spaces or line breaks
- ✓ No invalid characters outside TLV structure

---

## Testing with Real PIX Readers

### Test PIX Strings:

#### Example 1: Minimal Static PIX (No Amount)
```
00020101021126350014br.gov.bcb.pix0136xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx5204000053039865802BR5913NOME DA LOJA6009BRASILIA62070503***63047D6D
```

#### Example 2: Full PIX with Amount
```
00020101021126350014br.gov.bcb.pix01129999999999029Descricao520400530398654010100.00580214BR591MINHA LOJA6007SOROCABA610712345678006205103***6304XXXX
```

#### Example 3: PIX with Transaction ID
```
00020101021126350014br.gov.bcb.pix011599999999029Compra de Camiseta5204000530398654080150.50580214BR591LOJA ONLINE601SAOPAULO62160512TXID123450150001BR.GOV.BCB.BRCODE01051.0.06304ABCD
```

### How to Test:
1. Use any Brazilian bank app (Itaú, Bradesco, Santander, etc.)
2. Go to PIX > Scan QR Code
3. Generate QR from your test string
4. Scan and verify payment details appear correctly

---

## CRC16 Test Vectors

If you want to verify your CRC implementation independently:

```javascript
// Test cases: [payload_with_6304, expected_crc]
const testVectors = [
  // Format: payload (including 6304) → expected CRC result (4 hex chars)
  // Add your actual test vectors here
];

function verifyCRC(testVector) {
  const [payload, expectedCRC] = testVector;
  const calculated = CRC(payload);
  console.log(`Input: ${payload}`);
  console.log(`Expected: ${expectedCRC}`);
  console.log(`Calculated: ${calculated}`);
  console.log(`Status: ${calculated === expectedCRC ? 'PASS ✓' : 'FAIL ✗'}`);
}
```

Run this after generating actual test PIX strings with a known-working implementation.

---

## Debug Checklist When QR Code Doesn't Work

### First:
- [ ] QR code generated successfully (not blank/error)
- [ ] QR code scans and reads some data (not corrupted QR)
- [ ] Scanned data starts with `0002010102...`
- [ ] Scanned data ends with `6304` + 4 hex chars

### Second:
- [ ] All field IDs are 2 digits (`00`, not `0`)
- [ ] All field lengths are 2 digits (`03`, not `3`)
- [ ] Total characters in any nested field match their declared length
- [ ] No accented characters in text fields

### Third:
- [ ] CRC field is exactly 8 characters: `6304` + 4 hex
- [ ] CRC in uppercase (A-F, not a-f)
- [ ] CRC was calculated with `payload + "6304"` included
- [ ] CRC algorithm is CRC-16-CCITT-FFFF (not CRC-8, not CRC-32)

### Fourth:
- [ ] Payload without CRC matches expected structure for all optional fields
- [ ] Amount (if present) has exactly 2 decimal places
- [ ] Amount length field matches actual digit count
- [ ] PIX key sanitized (no formatting characters)
- [ ] Name and city have no accents

### If Still Failing:
1. Compare with reference implementation (klawdyo/pix.js)
2. Generate the same data with known-working library
3. Compare both CRCs and payloads character-by-character
4. Check for UTF-8 encoding issues in string handling
5. Verify lookup table in CRC implementation (all 256 entries)

