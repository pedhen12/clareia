# PIX BRCode - Reference Implementations (Source Code)

## JavaScript Implementation (klawdyo/pix.js)

### Source: https://github.com/klawdyo/pix.js

---

## 1. CRC16 Calculation (Complete Implementation)

**File: `src/crc.js`**

```javascript
/* eslint-disable eqeqeq */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */

/**
 * Convert number to hexadecimal with optional digit padding
 * @param {number} n - Number to convert
 * @param {number} digits - Target digit count (default: 4)
 * @returns {string} Hexadecimal string
 */
function numToHex(n, digits = 4) {
  const hex = n.toString(16).toUpperCase();

  if (digits) {
    return ('0'.repeat(digits) + hex).slice(-digits);
  }

  return (hex.length % 2 == 0) ? hex : `0${hex}`;
}

/**
 * CRC-16-CCITT-FFFF Calculation
 * Algorithm parameters:
 * - Polynomial: 0x1021
 * - Initial Value: 0xFFFF
 * - ReflIn: false
 * - ReflOut: false
 * - XorOut: 0x0000
 * 
 * @param {string} str - Input string to calculate CRC
 * @param {boolean} invert - Whether to invert byte order (default: false)
 * @returns {string} 4-character hexadecimal CRC value
 */
function CRC(str, invert = false) {
  const bytes = new TextEncoder().encode(str);

  // CRC-16-CCITT lookup table (256 entries)
  const crcTable = [
    0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7,
    0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef,
    0x1231, 0x0210, 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6,
    0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c, 0xf3ff, 0xe3de,
    0x2462, 0x3443, 0x0420, 0x1401, 0x64e6, 0x74c7, 0x44a4, 0x5485,
    0xa56a, 0xb54b, 0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d,
    0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6, 0x5695, 0x46b4,
    0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d, 0xc7bc,
    0x48c4, 0x58e5, 0x6886, 0x78a7, 0x0840, 0x1861, 0x2802, 0x3823,
    0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b,
    0x5af5, 0x4ad4, 0x7ab7, 0x6a96, 0x1a71, 0x0a50, 0x3a33, 0x2a12,
    0xdbfd, 0xcbdc, 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a,
    0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0x0c60, 0x1c41,
    0xedae, 0xfd8f, 0xcdec, 0xddcd, 0xad2a, 0xbd0b, 0x8d68, 0x9d49,
    0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70,
    0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a, 0x9f59, 0x8f78,
    0x9188, 0x81a9, 0xb1ca, 0xa1eb, 0xd10c, 0xc12d, 0xf14e, 0xe16f,
    0x1080, 0x00a1, 0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067,
    0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e,
    0x02b1, 0x1290, 0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256,
    0xb5ea, 0xa5cb, 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d,
    0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405,
    0xa7db, 0xb7fa, 0x8799, 0x97b8, 0xe75f, 0xf77e, 0xc71d, 0xd73c,
    0x26d3, 0x36f2, 0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634,
    0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9, 0xb98a, 0xa9ab,
    0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x08e1, 0x3882, 0x28a3,
    0xcb7d, 0xdb5c, 0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a,
    0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0, 0x2ab3, 0x3a92,
    0xfd2e, 0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9,
    0x7c26, 0x6c07, 0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1,
    0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8,
    0x6e17, 0x7e36, 0x4e55, 0x5e74, 0x2e93, 0x3eb2, 0x0ed1, 0x1ef0
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

module.exports = { CRC };
```

---

## 2. TLV Encoding - Main PIX Generation (Simplified)

**File: `src/pix.js` (Key Functions)**

```javascript
/**
 * Builds a single TLV field: "ID + Length + Value"
 * @param {Object} options - Field configuration
 * @returns {string} Encoded TLV string
 */
function getString(options = {}) {
  let { id, value } = options;
  const { name, children, sanitize, validation, required = false } = options;

  // Apply sanitization function if provided
  if (sanitize) value = sanitize(value);

  // Validate required fields
  if (required && !value && !children) {
    throw new Error(`"${name}" is required`);
  }

  // Return empty if optional and empty
  if (!required && !value && !children) return '';

  // Validate value if validation function provided
  if (validation) validation(value);

  // Remove accents from text
  if (value) value = removeAccent(value);

  // Convert ID to 2-digit string
  id = pad(id, 2);

  // Process nested children (for nested TLV)
  if (children) {
    value = children.reduce((accu, curr) => accu + getString(curr), '');
  }

  // Return: "ID + Length + Value"
  return `${id}${getLength(value, 2)}${value}`;
}

/**
 * Utility: Get length as zero-padded string
 */
function getLength(text, length = 2) {
  return pad(text.length, length);
}

/**
 * Build complete PIX payload
 * @param {Object} params - Configuration object
 * @returns {string} Complete PIX BRCode payload (without CRC)
 */
function buildPixPayload(params) {
  const configs = setConfigs(params);
  
  const payload = configs
    .filter(field => field) // Remove empty fields
    .reduce((accu, curr) => accu + getString(curr), '');
  
  return payload;
}

/**
 * Generate CRC field (ID=63)
 * @param {string} code - Complete payload without CRC
 * @returns {string} CRC field with format "6304XXXX"
 */
function getCRC(code) {
  return getString({
    id: 63,
    // Important: Append "6304" (id + length placeholder) before CRC calculation
    value: CRC(`${code}6304`),
  });
}

/**
 * Main function: Generate complete PIX BRCode
 * @param {Object} params - { key, name, amount, city, zipcode, txId, description, isUnique }
 * @returns {string} Complete PIX BRCode ready for QR encoding
 */
const pix = (params) => {
  try {
    // Build base payload
    const code = buildPixPayload(params);
    
    // Add CRC field
    return code + getCRC(code);
  } catch (error) {
    console.error('PIX Generation Error:', error.message);
    return null;
  }
};

module.exports = { pix };
```

---

## 3. Field Configuration Structure

**File: `src/pix.js` (setConfigs function - Simplified)**

```javascript
/**
 * Defines all required and optional fields for PIX BRCode
 * Each field is a TLV entry with ID, name, value, sanitization rules
 */
const setConfigs = (params = {}) => {
  const {
    txId = null,
    key = null,
    name = null,
    amount = null,
    city = null,
    zipcode = null,
    description = null,
    isUnique = false,
  } = params;

  return [
    // FIELD ID=00: Payload Format Indicator
    {
      id: 0,
      required: true,
      name: 'Payload format indicator',
      value: '01',
    },

    // FIELD ID=01: Point of Initiation Method
    {
      id: 1,
      required: false,
      name: 'Point of Initiation Method',
      value: isUnique,
      sanitize: (value) => (value ? '12' : '11'), // '12'=unique, '11'=static
    },

    // FIELD ID=26: Merchant Account Information (Nested TLV)
    {
      id: 26,
      required: true,
      name: 'Merchant Account Information',
      children: [
        {
          id: 0,
          required: true,
          name: 'GUI',
          value: 'BR.GOV.BCB.PIX',
        },
        {
          id: 1,
          required: true,
          name: 'PIX Key',
          value: key,
          sanitize: (value) => sanitizeKey(value),
        },
        {
          id: 2,
          required: false,
          name: 'Transaction Description',
          value: description,
          sanitize: (value) => (!value ? '' : String(value).substr(0, 25).trim()),
        },
      ],
    },

    // FIELD ID=52: Merchant Category Code
    {
      id: 52,
      required: true,
      name: 'Merchant Category Code',
      value: '0000',
    },

    // FIELD ID=53: Transaction Currency (BRL = 986)
    {
      id: 53,
      required: true,
      name: 'Transaction Currency',
      value: '986',
    },

    // FIELD ID=54: Transaction Amount (Optional)
    {
      id: 54,
      required: false,
      name: 'Transaction Amount',
      value: amount,
      sanitize: (value) => (!value ? '' : Number.parseFloat(value).toFixed(2)),
    },

    // FIELD ID=58: Country Code
    {
      id: 58,
      required: true,
      name: 'Country Code',
      value: 'BR',
    },

    // FIELD ID=59: Merchant Name
    {
      id: 59,
      required: true,
      name: 'Merchant Name',
      value: name,
      sanitize: (value) => String(value).substr(0, 25).trim(),
    },

    // FIELD ID=60: Merchant City
    {
      id: 60,
      required: true,
      name: 'Merchant City',
      value: city,
      sanitize: (value) => String(value).substr(0, 15).trim(),
    },

    // FIELD ID=61: Postal Code (Optional)
    {
      id: 61,
      required: false,
      name: 'Postal Code',
      value: zipcode,
      sanitize: (value) => String(value)
        .replace(/[^0-9]+/g, '')
        .substr(0, 15)
        .trim(),
    },

    // FIELD ID=62: Additional Data Field Template (Nested TLV)
    {
      id: 62,
      required: true,
      name: 'Additional Data Field Template',
      children: [
        // SUB-FIELD ID=05: Reference Label (Transaction ID)
        {
          id: 5,
          required: true,
          name: 'Reference Label',
          value: txId || '***',
          validation: (value) => {
            if (String(value).length > 25) {
              throw new Error('txId cannot exceed 25 characters');
            }
            if (/[^0-9a-z\*]/i.test(value)) {
              throw new Error('txId allows only letters, numbers, and asterisks');
            }
            return true;
          },
        },

        // SUB-FIELD ID=50: Payment System Specific Template
        {
          id: 50,
          required: true,
          name: 'Payment System specific template',
          children: [
            {
              id: 0,
              name: 'Globally Unique Identifier',
              value: 'BR.GOV.BCB.BRCODE',
            },
            {
              id: 1,
              name: 'Payment System specific',
              value: '1.0.0',
            },
          ],
        },
      ],
    },
  ];
};
```

---

## 4. Utility Functions

**File: `src/utils.js`**

```javascript
/**
 * Left-pad string with zeros
 * @param {any} value - Value to pad
 * @param {number} length - Target length
 * @returns {string} Padded string
 */
const pad = (value, length = 2) => String(value).padStart(length, '0');

/**
 * Remove accents from string (UFD decomposition)
 * Converts accented characters to their base equivalents
 * á→a, ã→a, é→e, ç→c, etc.
 * @param {string} str - Input string
 * @returns {string} String without accents
 */
const removeAccent = (str) => {
  str = String(str);
  
  const comAcento = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ';
  const semAcento = 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr';
  let novastr = '';

  for (let i = 0; i < str.length; i++) {
    let troca = false;
    for (let a = 0; a < comAcento.length; a++) {
      if (str.substr(i, 1) === comAcento.substr(a, 1)) {
        novastr += semAcento.substr(a, 1);
        troca = true;
        break;
      }
    }
    if (!troca) {
      novastr += str.substr(i, 1);
    }
  }
  return novastr;
};

/**
 * Detect PIX key type
 * @param {string} pixKey - The PIX key
 * @returns {string} One of: 'cpf', 'cnpj', 'email', 'phone', 'random'
 */
function getKeyType(pixKey) {
  const regexes = {
    email: /@/,
    phone: /^\+/,
    cpf: /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/,
    cnpj: /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/,
    random: /^[0-9a-f]{4,}-[0-9a-f]{4,}-[0-9a-f]{4,}-[0-9a-f]{4,}-[0-9a-f]{4,}$/,
  };

  const match = Object.keys(regexes).find((key) => regexes[key].test(pixKey));
  return match;
}

/**
 * Sanitize PIX key according to its type
 * @param {string} pixKey - The PIX key
 * @returns {string} Sanitized PIX key
 */
function sanitizeKey(pixKey) {
  const sanitizable = {
    cpf: { rgx: /[^0-9]+/g, replace: '' },
    cnpj: { rgx: /[^0-9]+/g, replace: '' },
    phone: { rgx: /[^+0-9]+/g, replace: '' },
  };

  const sanitizableKeys = Object.keys(sanitizable);
  const keyType = getKeyType(pixKey);

  return sanitizableKeys.includes(keyType)
    ? String(pixKey).replace(sanitizable[keyType].rgx, sanitizable[keyType].replace)
    : pixKey;
}

module.exports = { pad, removeAccent, getKeyType, sanitizeKey };
```

---

## 5. Complete Usage Example

```javascript
const { pix, qrcode } = require('./src/pix');
const QRCode = require('qrcode');

// Example: Generate PIX BRCode
const pixPayload = pix({
  name: 'MINHA LOJA LTDA',        // Merchant name (max 25 chars)
  key: '11999999999',             // PIX key (phone, CPF, CNPJ, email, or UUID)
  city: 'SAO PAULO',              // Merchant city (max 15 chars, no accents)
  zipcode: '01310100',            // Optional
  amount: 150.00,                 // Optional (always with 2 decimals)
  txId: 'PEDIDO123',              // Optional transaction ID (max 25 chars, alphanumeric)
  description: 'Pagamento',       // Optional description (max 25 chars, no accents)
  isUnique: false,                // false='11' (static/reusable), true='12' (unique)
});

console.log('PIX BRCode:', pixPayload);
// Output: "00020101021126350014BR.GOV.BCB.PIX011199999999990209Pagamento..."

// Generate QR Code image
qrcode({ ...params }).then(dataUrl => {
  console.log('QR Code (Base64):', dataUrl);
  // Use the dataUrl in an <img> tag or save to file
});
```

---

## 6. Key Implementation Notes for JavaScript

### CRC16 Critical Steps:
1. Build complete payload WITHOUT the CRC field
2. **Append "6304"** to the payload (this placeholder will be replaced)
3. Pass to `CRC()` function
4. Result is 4-char hex uppercase string
5. Replace `6304` with `63` + `04` (length stays same) + CRC_HEX

### TLV Building:
- Each field: `pad(id,2) + pad(value.length,2) + value`
- Nested fields process children recursively
- All lengths calculated AFTER sanitization and accent removal
- All IDs and lengths must be zero-padded to 2 digits

### Data Sanitization Order:
1. Remove formatting (CPF/CNPJ punctuation)
2. Remove accents (UTF-8 decomposition)
3. Trim whitespace
4. Validate maximum length
5. THEN calculate TLV length

---

## 7. Testing CRC16 Implementation

```javascript
// Test cases for CRC validation
const testCases = [
  {
    input: '00020101021126350014BR.GOV.BCB.PIX01111199999999990209Pagamento520400530393986540713123.45580214BR591DMINHA%20LOJA600SAO%20PAULO610801310100621605077PGTO001501150BR.GOV.BCB.BRCODE01051.0.06304',
    expectedCRC: 'A1B2', // Example - replace with actual expected value
  }
];

const { CRC } = require('./src/crc');

testCases.forEach(test => {
  const calculatedCRC = CRC(test.input);
  console.log(`Input: ${test.input}`);
  console.log(`Expected: ${test.expectedCRC}`);
  console.log(`Calculated: ${calculatedCRC}`);
  console.log(`Match: ${calculatedCRC === test.expectedCRC ? '✓' : '✗'}`);
});
```

