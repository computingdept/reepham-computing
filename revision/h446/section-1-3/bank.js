// Original RHSC MCQ practice aligned to OCR H446 1.3.1–1.3.4.
const SKILLS = [
  {
    "id": "13-compression",
    "section": "1.3",
    "spec": "1.3.1(a)",
    "title": "Lossy and lossless compression",
    "lessons": [
      127
    ],
    "page": 75,
    "questions": [
      {
        "id": "13-compression-1",
        "prompt": "A source-code file must be recovered exactly. Which compression type is appropriate?",
        "answer": "Lossless",
        "options": [
          "Lossless",
          "Lossy",
          "Either always",
          "Neither ever"
        ],
        "explanation": "Lossless compression reconstructs the original bits, which is essential for source code.",
        "skill": "Lossy and lossless compression"
      },
      {
        "id": "13-compression-2",
        "prompt": "What makes lossy compression different from lossless compression?",
        "answer": "Some original data is discarded",
        "options": [
          "Some original data is discarded",
          "A secret key is required",
          "All repetition is preserved",
          "The file always grows"
        ],
        "explanation": "Lossy methods discard information, so decompression cannot in general reproduce the original exactly.",
        "skill": "Lossy and lossless compression"
      },
      {
        "id": "13-compression-3",
        "prompt": "Why might a music service choose lossy compression for streaming?",
        "answer": "Smaller transfers at acceptable quality",
        "options": [
          "Smaller transfers at acceptable quality",
          "Perfect recovery of every sample",
          "Automatic copyright protection",
          "No decompression is needed"
        ],
        "explanation": "Discarding less perceptible audio information can reduce bandwidth while retaining acceptable perceived quality.",
        "skill": "Lossy and lossless compression"
      },
      {
        "id": "13-compression-4",
        "prompt": "A scan is needed for exact archival analysis. What is the strongest reason to choose lossless compression?",
        "answer": "Preserve the original data",
        "options": [
          "Preserve the original data",
          "Guarantee the smallest file",
          "Remove all image noise",
          "Hide the image contents"
        ],
        "explanation": "Lossless compression preserves the data exactly; it does not necessarily achieve the smallest file.",
        "skill": "Lossy and lossless compression"
      },
      {
        "id": "13-compression-5",
        "prompt": "Which is a possible cost of compressing a file before transmission?",
        "answer": "Extra processing time",
        "options": [
          "Extra processing time",
          "Guaranteed extra bandwidth use",
          "Loss of every file name",
          "Removal of all metadata always"
        ],
        "explanation": "Compression and decompression require processing, so size savings must be considered alongside time and resources.",
        "skill": "Lossy and lossless compression"
      },
      {
        "id": "13-compression-6",
        "prompt": "Why is lossy compression unsuitable for a compiled executable?",
        "answer": "Changed bits may break execution",
        "options": [
          "Changed bits may break execution",
          "Processors cannot read small files",
          "Executables contain no repetition",
          "All executables are images"
        ],
        "explanation": "Discarding bits can alter machine instructions or data and prevent correct execution.",
        "skill": "Lossy and lossless compression"
      },
      {
        "id": "13-compression-7",
        "prompt": "A video is already heavily compressed. What happens if it is compressed again losslessly?",
        "answer": "Little saving or possible growth",
        "options": [
          "Little saving or possible growth",
          "Its size must halve",
          "Every frame is discarded",
          "Original lost detail is restored"
        ],
        "explanation": "Already compressed data may contain little redundancy; format overhead can even make it larger.",
        "skill": "Lossy and lossless compression"
      },
      {
        "id": "13-compression-8",
        "prompt": "How can compression help a mobile user with limited data allowance?",
        "answer": "Reduce bytes downloaded",
        "options": [
          "Reduce bytes downloaded",
          "Increase the allowance itself",
          "Remove all network latency",
          "Guarantee uninterrupted service"
        ],
        "explanation": "Fewer transmitted bytes can reduce data usage, but compression cannot guarantee network availability.",
        "skill": "Lossy and lossless compression"
      },
      {
        "id": "13-compression-9",
        "prompt": "A lossy photo is decompressed. Can the discarded detail generally be recovered exactly?",
        "answer": "No",
        "options": [
          "No",
          "Yes, by enlarging it",
          "Yes, by saving it twice",
          "Yes, with any lossless format"
        ],
        "explanation": "Changing the container or resolution cannot reconstruct information that was discarded during lossy compression.",
        "skill": "Lossy and lossless compression"
      },
      {
        "id": "13-compression-10",
        "prompt": "Which comparison is accurate for lossless and lossy methods?",
        "answer": "Both aim to reduce data size",
        "options": [
          "Both aim to reduce data size",
          "Both guarantee exact reconstruction",
          "Both require a private key",
          "Both always shrink every input"
        ],
        "explanation": "Both are compression approaches, but exact reconstruction is a lossless property and size reductions depend on the input.",
        "skill": "Lossy and lossless compression"
      }
    ]
  },
  {
    "id": "13-rle",
    "section": "1.3",
    "spec": "1.3.1(b)",
    "title": "Run-length encoding",
    "lessons": [
      128
    ],
    "page": 76,
    "questions": [
      {
        "id": "13-rle-1",
        "prompt": "RLE stores each run as count then symbol. How is AAAABB encoded?",
        "answer": "4A2B",
        "options": [
          "4A2B",
          "A4B4",
          "2A4B",
          "6AB"
        ],
        "explanation": "The input has four consecutive As followed by two consecutive Bs.",
        "skill": "Run-length encoding"
      },
      {
        "id": "13-rle-2",
        "prompt": "Decode the count-symbol RLE sequence 3X2Y1Z.",
        "answer": "XXXYYZ",
        "options": [
          "XXXYYZ",
          "XXYYYZ",
          "XYZXYZ",
          "XXXXXZ"
        ],
        "explanation": "Expand each run separately: three Xs, two Ys and one Z.",
        "skill": "Run-length encoding"
      },
      {
        "id": "13-rle-3",
        "prompt": "Which input is most suitable for simple RLE?",
        "answer": "AAAAAAAAAAAA",
        "options": [
          "AAAAAAAAAAAA",
          "ABCDABCDABCD",
          "ABCDEFGHIJKL",
          "ABABABABABAB"
        ],
        "explanation": "Long consecutive runs let RLE replace many symbols with a short count-symbol pair.",
        "skill": "Run-length encoding"
      },
      {
        "id": "13-rle-4",
        "prompt": "Under one-byte counts and one-byte symbols, how many bytes encode AAAAAAAA as a single run?",
        "answer": "2",
        "options": [
          "2",
          "8",
          "9",
          "16"
        ],
        "explanation": "One run requires one count byte and one symbol byte, giving two bytes.",
        "skill": "Run-length encoding"
      },
      {
        "id": "13-rle-5",
        "prompt": "With one-byte counts and symbols, RLE encodes ABCD using how many bytes?",
        "answer": "8",
        "options": [
          "8",
          "4",
          "2",
          "6"
        ],
        "explanation": "There are four runs of length one, each taking two bytes, so the total is eight bytes.",
        "skill": "Run-length encoding"
      },
      {
        "id": "13-rle-6",
        "prompt": "Does simple RLE lose any of the original run information?",
        "answer": "No, it is lossless",
        "options": [
          "No, it is lossless",
          "Yes, it discards every other run",
          "Yes, it discards short runs",
          "Only for images"
        ],
        "explanation": "Run lengths and symbols allow the original sequence to be reconstructed exactly.",
        "skill": "Run-length encoding"
      },
      {
        "id": "13-rle-7",
        "prompt": "In count-symbol notation, how many symbols does 5A3B2C decode to?",
        "answer": "10",
        "options": [
          "10",
          "3",
          "8",
          "12"
        ],
        "explanation": "Add the run lengths: 5 + 3 + 2 = 10 symbols.",
        "skill": "Run-length encoding"
      },
      {
        "id": "13-rle-8",
        "prompt": "Encode BBBAAAAAACC using count-symbol pairs.",
        "answer": "3B6A2C",
        "options": [
          "3B6A2C",
          "3B5A2C",
          "2B6A3C",
          "6B3A2C"
        ],
        "explanation": "There are three Bs, six As and two Cs, in that order.",
        "skill": "Run-length encoding"
      },
      {
        "id": "13-rle-9",
        "prompt": "Why can simple RLE make alternating data larger?",
        "answer": "Each short run needs a count",
        "options": [
          "Each short run needs a count",
          "Alternation requires encryption",
          "The decoder loses its dictionary",
          "Every symbol becomes a pixel"
        ],
        "explanation": "With many single-symbol runs, storing counts adds overhead without long runs to offset it.",
        "skill": "Run-length encoding"
      },
      {
        "id": "13-rle-10",
        "prompt": "A run count occupies one byte with maximum value 255. How can a run of 300 As be represented?",
        "answer": "255A45A",
        "options": [
          "255A45A",
          "300 in one byte",
          "255A55A",
          "45A only"
        ],
        "explanation": "Split the run into legal counts totalling 300; 255 + 45 = 300.",
        "skill": "Run-length encoding"
      }
    ]
  },
  {
    "id": "13-dictionary",
    "section": "1.3",
    "spec": "1.3.1(b)",
    "title": "Dictionary coding and bit costs",
    "lessons": [
      129
    ],
    "page": 235,
    "questions": [
      {
        "id": "13-dictionary-1",
        "prompt": "Dictionary coding replaces repeated strings with what?",
        "answer": "References to dictionary entries",
        "options": [
          "References to dictionary entries",
          "Random missing characters",
          "Public encryption keys",
          "Only run lengths"
        ],
        "explanation": "Repeated substrings can be stored once in a dictionary and represented by shorter codes.",
        "skill": "Dictionary coding and bit costs"
      },
      {
        "id": "13-dictionary-2",
        "prompt": "A dictionary maps 0=CAT and 1=DOG. Decode 0,1,0 with no separators in the output.",
        "answer": "CATDOGCAT",
        "options": [
          "CATDOGCAT",
          "DOGCATDOG",
          "CATCATDOG",
          "CATDOGDOG"
        ],
        "explanation": "Replace each code with its matching dictionary string in order.",
        "skill": "Dictionary coding and bit costs"
      },
      {
        "id": "13-dictionary-3",
        "prompt": "Why must a decoder know the dictionary used by an encoder?",
        "answer": "To map codes back to strings",
        "options": [
          "To map codes back to strings",
          "To remove all repeated strings",
          "To obtain a private key",
          "To choose image colours"
        ],
        "explanation": "Without the relevant dictionary or reconstruction rules, codes do not identify their original strings.",
        "skill": "Dictionary coding and bit costs"
      },
      {
        "id": "13-dictionary-4",
        "prompt": "A fixed dictionary has eight entries. What is the minimum fixed code width?",
        "answer": "3 bits",
        "options": [
          "3 bits",
          "2 bits",
          "4 bits",
          "8 bits"
        ],
        "explanation": "Three bits represent eight distinct codes because 2 cubed equals eight.",
        "skill": "Dictionary coding and bit costs"
      },
      {
        "id": "13-dictionary-5",
        "prompt": "A fixed dictionary has nine entries. What is the minimum fixed code width?",
        "answer": "4 bits",
        "options": [
          "4 bits",
          "3 bits",
          "9 bits",
          "2 bits"
        ],
        "explanation": "Three bits cover only eight entries; four bits cover up to sixteen.",
        "skill": "Dictionary coding and bit costs"
      },
      {
        "id": "13-dictionary-6",
        "prompt": "Sixteen two-bit tokens are sent. Ignore all overhead. What is the token-stream size?",
        "answer": "32 bits",
        "options": [
          "32 bits",
          "16 bits",
          "8 bits",
          "64 bits"
        ],
        "explanation": "Multiply the number of tokens by their code width: 16 times 2 = 32 bits.",
        "skill": "Dictionary coding and bit costs"
      },
      {
        "id": "13-dictionary-7",
        "prompt": "A dictionary costs 40 bits and its token stream costs 24 bits. What is the total compressed size?",
        "answer": "64 bits",
        "options": [
          "64 bits",
          "24 bits",
          "40 bits",
          "16 bits"
        ],
        "explanation": "Include both dictionary overhead and the token stream: 40 + 24 = 64 bits.",
        "skill": "Dictionary coding and bit costs"
      },
      {
        "id": "13-dictionary-8",
        "prompt": "Why can dictionary coding work where simple RLE performs poorly?",
        "answer": "It finds repeated non-run strings",
        "options": [
          "It finds repeated non-run strings",
          "It requires only identical pixels",
          "It discards uncommon words",
          "It ignores decoder information"
        ],
        "explanation": "A repeated substring such as AB can be coded even when no individual character forms a long run.",
        "skill": "Dictionary coding and bit costs"
      },
      {
        "id": "13-dictionary-9",
        "prompt": "A 160-bit original becomes 100 bits including overhead. How many bits are saved?",
        "answer": "60 bits",
        "options": [
          "60 bits",
          "100 bits",
          "160 bits",
          "260 bits"
        ],
        "explanation": "Subtract compressed size from original size: 160 minus 100 = 60 bits.",
        "skill": "Dictionary coding and bit costs"
      },
      {
        "id": "13-dictionary-10",
        "prompt": "Which limitation can reduce dictionary compression savings on a short file?",
        "answer": "Dictionary overhead",
        "options": [
          "Dictionary overhead",
          "Perfect reconstruction",
          "Repeated long phrases",
          "Shared decoding rules"
        ],
        "explanation": "The dictionary and metadata may cost more bits than are saved by replacing a small number of strings.",
        "skill": "Dictionary coding and bit costs"
      }
    ]
  },
  {
    "id": "13-encryption",
    "section": "1.3",
    "spec": "1.3.1(c)",
    "title": "Symmetric and asymmetric encryption",
    "lessons": [
      130,
      131,
      132
    ],
    "page": 76,
    "questions": [
      {
        "id": "13-encryption-1",
        "prompt": "Which key arrangement defines symmetric encryption?",
        "answer": "A shared secret key",
        "options": [
          "A shared secret key",
          "A public key only",
          "No key at either end",
          "Two unrelated public keys"
        ],
        "explanation": "The parties use a shared secret for encryption and decryption in a symmetric scheme.",
        "skill": "Symmetric and asymmetric encryption"
      },
      {
        "id": "13-encryption-2",
        "prompt": "To send confidential data to B using public-key encryption, which key should A use?",
        "answer": "B’s public key",
        "options": [
          "B’s public key",
          "A’s public key",
          "B’s private key",
          "A public hash value"
        ],
        "explanation": "Data encrypted for B with B’s public key is decrypted using B’s corresponding private key.",
        "skill": "Symmetric and asymmetric encryption"
      },
      {
        "id": "13-encryption-3",
        "prompt": "Who should keep B’s private decryption key secret?",
        "answer": "B",
        "options": [
          "B",
          "Every website visitor",
          "All network routers",
          "The public DNS service"
        ],
        "explanation": "Publishing the private key would let others decrypt data intended for B.",
        "skill": "Symmetric and asymmetric encryption"
      },
      {
        "id": "13-encryption-4",
        "prompt": "What is a key-distribution difficulty for symmetric encryption?",
        "answer": "Sharing the secret securely",
        "options": [
          "Sharing the secret securely",
          "Publishing the public key openly",
          "Making plaintext visible",
          "Choosing a file extension"
        ],
        "explanation": "Both parties need the same secret without an attacker obtaining it during distribution.",
        "skill": "Symmetric and asymmetric encryption"
      },
      {
        "id": "13-encryption-5",
        "prompt": "Why do secure connections commonly combine public-key methods with symmetric encryption?",
        "answer": "Efficient bulk encryption",
        "options": [
          "Efficient bulk encryption",
          "No need to authenticate anyone",
          "Every message needs two private keys",
          "Symmetric encryption is lossless coding"
        ],
        "explanation": "Public-key mechanisms can establish authenticated key material; symmetric algorithms efficiently protect bulk traffic.",
        "skill": "Symmetric and asymmetric encryption"
      },
      {
        "id": "13-encryption-6",
        "prompt": "What does encryption primarily provide for intercepted message contents?",
        "answer": "Confidentiality",
        "options": [
          "Confidentiality",
          "Guaranteed availability",
          "Smaller file size",
          "Automatic deletion"
        ],
        "explanation": "Without the appropriate key, an interceptor should not be able to read the protected contents.",
        "skill": "Symmetric and asymmetric encryption"
      },
      {
        "id": "13-encryption-7",
        "prompt": "Which key is normally safe to distribute openly in an asymmetric key pair?",
        "answer": "The public key",
        "options": [
          "The public key",
          "The private key",
          "Both secret keys",
          "Neither key ever"
        ],
        "explanation": "The public key is designed for distribution; its authenticity still needs to be established.",
        "skill": "Symmetric and asymmetric encryption"
      },
      {
        "id": "13-encryption-8",
        "prompt": "A sends an encrypted message to B with B’s public key. Which key decrypts it?",
        "answer": "B’s private key",
        "options": [
          "B’s private key",
          "A’s private key",
          "B’s public key",
          "Any shared password"
        ],
        "explanation": "The corresponding private key reverses the public-key encryption operation in this confidentiality use case.",
        "skill": "Symmetric and asymmetric encryption"
      },
      {
        "id": "13-encryption-9",
        "prompt": "Why is knowing whose public key you have important?",
        "answer": "An attacker could substitute a key",
        "options": [
          "An attacker could substitute a key",
          "Public keys must all be passwords",
          "All public keys are identical",
          "Encryption always prevents impersonation"
        ],
        "explanation": "A substituted key could make A encrypt data to an attacker, so authenticity of the key matters.",
        "skill": "Symmetric and asymmetric encryption"
      },
      {
        "id": "13-encryption-10",
        "prompt": "Does encrypting a backup automatically make it smaller?",
        "answer": "No",
        "options": [
          "No",
          "Yes, always by half",
          "Yes, to its hash length",
          "Only with a public key"
        ],
        "explanation": "Encryption protects contents; compression is the operation designed to reduce size.",
        "skill": "Symmetric and asymmetric encryption"
      }
    ]
  },
  {
    "id": "13-hashing",
    "section": "1.3",
    "spec": "1.3.1(d)",
    "title": "Hashing and its applications",
    "lessons": [
      133
    ],
    "page": 76,
    "questions": [
      {
        "id": "13-hashing-1",
        "prompt": "What is the output of a cryptographic hash function commonly called?",
        "answer": "A digest",
        "options": [
          "A digest",
          "A decryption key",
          "A lossless archive",
          "A public certificate"
        ],
        "explanation": "A digest is a fixed-length value computed from input data by the selected hash function.",
        "skill": "Hashing and its applications"
      },
      {
        "id": "13-hashing-2",
        "prompt": "What is a hash collision?",
        "answer": "Different inputs share a hash",
        "options": [
          "Different inputs share a hash",
          "A key decrypts a message",
          "A file has no bytes",
          "A digest contains a password"
        ],
        "explanation": "A fixed output space means distinct inputs can map to the same digest.",
        "skill": "Hashing and its applications"
      },
      {
        "id": "13-hashing-3",
        "prompt": "Why store a salted password hash instead of plaintext passwords?",
        "answer": "Reduce exposure if storage leaks",
        "options": [
          "Reduce exposure if storage leaks",
          "Recover every password by decryption",
          "Make all passwords identical",
          "Avoid checking logins"
        ],
        "explanation": "Login checks compare password-derived values, avoiding storage of directly readable passwords; suitable password hashing remains important.",
        "skill": "Hashing and its applications"
      },
      {
        "id": "13-hashing-4",
        "prompt": "A downloaded file’s digest differs from a trusted expected digest. What can be concluded?",
        "answer": "The file does not match",
        "options": [
          "The file does not match",
          "The sender is certainly identified",
          "The file is safely encrypted",
          "The original can be recovered"
        ],
        "explanation": "A mismatch detects a difference, but does not identify its cause or reconstruct the original.",
        "skill": "Hashing and its applications"
      },
      {
        "id": "13-hashing-5",
        "prompt": "Why is hashing not a substitute for encryption when a message must later be read?",
        "answer": "Hashes are not designed to reverse",
        "options": [
          "Hashes are not designed to reverse",
          "Every hash includes the plaintext",
          "Hashing needs both public keys",
          "Hashing always enlarges messages"
        ],
        "explanation": "Encryption is reversible with the appropriate key; a cryptographic hash is designed to resist inversion.",
        "skill": "Hashing and its applications"
      },
      {
        "id": "13-hashing-6",
        "prompt": "What does a random salt help prevent in password storage?",
        "answer": "Reuse of precomputed hash tables",
        "options": [
          "Reuse of precomputed hash tables",
          "All password guessing forever",
          "Every database attack",
          "The need for a password check"
        ],
        "explanation": "Different salts produce different derived values for the same password and make bulk precomputed lookups less useful.",
        "skill": "Hashing and its applications"
      },
      {
        "id": "13-hashing-7",
        "prompt": "A hash table uses key MOD 10. Which index does key 47 produce?",
        "answer": "7",
        "options": [
          "7",
          "4",
          "10",
          "47"
        ],
        "explanation": "47 divided by 10 leaves remainder 7; the hash selects a candidate storage location.",
        "skill": "Hashing and its applications"
      },
      {
        "id": "13-hashing-8",
        "prompt": "Two lookup keys map to one hash-table index. What is needed?",
        "answer": "Collision handling",
        "options": [
          "Collision handling",
          "Lossy decompression",
          "A new HTML tag",
          "Deletion of both records"
        ],
        "explanation": "A hash table needs a method such as chaining or probing to store and find colliding keys.",
        "skill": "Hashing and its applications"
      },
      {
        "id": "13-hashing-9",
        "prompt": "Does matching an untrusted digest alone prove who sent a file?",
        "answer": "No",
        "options": [
          "No",
          "Yes, always",
          "Yes, if the file is small",
          "Only for text files"
        ],
        "explanation": "An attacker could replace both file and digest; authenticity requires a trusted reference or authentication mechanism.",
        "skill": "Hashing and its applications"
      },
      {
        "id": "13-hashing-10",
        "prompt": "For one chosen hash algorithm, what happens to digest length when the input grows?",
        "answer": "It stays fixed",
        "options": [
          "It stays fixed",
          "It equals input length",
          "It doubles for each byte",
          "It becomes the encryption key"
        ],
        "explanation": "The selected algorithm has a fixed digest length, independent of the input size.",
        "skill": "Hashing and its applications"
      }
    ]
  },
  {
    "id": "13-foundations",
    "section": "1.3",
    "spec": "1.3.2(a)",
    "title": "Database tables and keys",
    "lessons": [
      134
    ],
    "page": 80,
    "questions": [
      {
        "id": "13-foundations-1",
        "prompt": "In a relational database, what does a record represent?",
        "answer": "One row describing an instance",
        "options": [
          "One row describing an instance",
          "One whole database program",
          "Every table at once",
          "Only an attribute name"
        ],
        "explanation": "A record contains field values describing one instance of an entity.",
        "skill": "Database tables and keys"
      },
      {
        "id": "13-foundations-2",
        "prompt": "What is an attribute in a database table?",
        "answer": "A named property or column",
        "options": [
          "A named property or column",
          "The entire database file",
          "Only a unique row",
          "A network protocol"
        ],
        "explanation": "An attribute describes a property of the entity and corresponds to a column.",
        "skill": "Database tables and keys"
      },
      {
        "id": "13-foundations-3",
        "prompt": "What property must a primary key have?",
        "answer": "Uniquely identifies each record",
        "options": [
          "Uniquely identifies each record",
          "Must contain a person’s name",
          "May be missing in every row",
          "Must change on every lookup"
        ],
        "explanation": "A primary key uniquely identifies each row and cannot be null.",
        "skill": "Database tables and keys"
      },
      {
        "id": "13-foundations-4",
        "prompt": "Two pupils share the same name. Which is the better primary key?",
        "answer": "Unique PupilID",
        "options": [
          "Unique PupilID",
          "First name",
          "Tutor group",
          "Date of birth alone"
        ],
        "explanation": "A stable unique identifier avoids ambiguity when names or dates are shared.",
        "skill": "Database tables and keys"
      },
      {
        "id": "13-foundations-5",
        "prompt": "What is a composite key?",
        "answer": "A key using multiple attributes",
        "options": [
          "A key using multiple attributes",
          "An encrypted single password",
          "A table without columns",
          "A key chosen by font size"
        ],
        "explanation": "A combination of attributes can uniquely identify a row when an individual attribute cannot.",
        "skill": "Database tables and keys"
      },
      {
        "id": "13-foundations-6",
        "prompt": "How does a relational database differ from a single flat file?",
        "answer": "It links related tables",
        "options": [
          "It links related tables",
          "It cannot store text",
          "It requires duplicate rows",
          "It has no records"
        ],
        "explanation": "Relational designs separate entities into tables and use keys to represent relationships.",
        "skill": "Database tables and keys"
      },
      {
        "id": "13-foundations-7",
        "prompt": "What is a foreign key used for?",
        "answer": "Referencing a key in a relation",
        "options": [
          "Referencing a key in a relation",
          "Encrypting a primary key",
          "Sorting bytes physically only",
          "Replacing all table names"
        ],
        "explanation": "A foreign key links a row to a referenced key, commonly a primary key in another table.",
        "skill": "Database tables and keys"
      },
      {
        "id": "13-foundations-8",
        "prompt": "Which secondary key could help find pupils without uniquely identifying them?",
        "answer": "Surname",
        "options": [
          "Surname",
          "Unique PupilID only",
          "Every primary-key value",
          "A compulsory unique index"
        ],
        "explanation": "A secondary search key such as surname can identify several records and support retrieval.",
        "skill": "Database tables and keys"
      },
      {
        "id": "13-foundations-9",
        "prompt": "Why separate Customer details from many Order records?",
        "answer": "Reduce repeated customer details",
        "options": [
          "Reduce repeated customer details",
          "Eliminate every relationship",
          "Prevent customers having orders",
          "Guarantee no indexes are needed"
        ],
        "explanation": "One customer record can be referenced by many orders, reducing duplicated details and update problems.",
        "skill": "Database tables and keys"
      },
      {
        "id": "13-foundations-10",
        "prompt": "An entity is best described as what?",
        "answer": "A type of thing being modelled",
        "options": [
          "A type of thing being modelled",
          "Only a database password",
          "A collection of SQL keywords",
          "A network switch"
        ],
        "explanation": "An entity such as Pupil or Course represents a type of real-world thing about which data is stored.",
        "skill": "Database tables and keys"
      }
    ]
  },
  {
    "id": "13-relationships",
    "section": "1.3",
    "spec": "1.3.2(a)",
    "title": "Entity relationships",
    "lessons": [
      135
    ],
    "page": 85,
    "questions": [
      {
        "id": "13-relationships-1",
        "prompt": "One customer can place many orders; each order has one customer. What is the relationship?",
        "answer": "One-to-many",
        "options": [
          "One-to-many",
          "One-to-one",
          "Many-to-many",
          "No relationship"
        ],
        "explanation": "A single Customer instance relates to several Orders, while each Order relates to one Customer.",
        "skill": "Entity relationships"
      },
      {
        "id": "13-relationships-2",
        "prompt": "In Customer to Order, where should CustomerID normally be a foreign key?",
        "answer": "In Order",
        "options": [
          "In Order",
          "Only in Customer",
          "In neither table",
          "In every product name"
        ],
        "explanation": "The many-side Order table carries CustomerID to identify each order’s customer.",
        "skill": "Entity relationships"
      },
      {
        "id": "13-relationships-3",
        "prompt": "Pupils join many clubs; each club has many pupils. What relationship is this?",
        "answer": "Many-to-many",
        "options": [
          "Many-to-many",
          "One-to-one",
          "One-to-many only",
          "An unlinked flat file"
        ],
        "explanation": "Both entity types can relate to several instances of the other.",
        "skill": "Entity relationships"
      },
      {
        "id": "13-relationships-4",
        "prompt": "How is a many-to-many Pupil–Club relationship usually implemented relationally?",
        "answer": "A Membership linking table",
        "options": [
          "A Membership linking table",
          "One repeated list in each name",
          "Removing all keys",
          "One table per membership value"
        ],
        "explanation": "A linking entity holds one row per association, with foreign keys to Pupil and Club.",
        "skill": "Entity relationships"
      },
      {
        "id": "13-relationships-5",
        "prompt": "Which pair can form a Membership composite primary key if duplicate memberships are forbidden?",
        "answer": "PupilID and ClubID",
        "options": [
          "PupilID and ClubID",
          "PupilName and ClubName always",
          "ClubID alone",
          "PupilID alone"
        ],
        "explanation": "The pair identifies a particular pupil-club association; either field alone can recur.",
        "skill": "Entity relationships"
      },
      {
        "id": "13-relationships-6",
        "prompt": "An ER diagram’s crow’s foot commonly indicates what?",
        "answer": "Many",
        "options": [
          "Many",
          "Exactly one only",
          "A password field",
          "A computed total"
        ],
        "explanation": "The crow’s foot marks the many end of a relationship; optionality is shown separately.",
        "skill": "Entity relationships"
      },
      {
        "id": "13-relationships-7",
        "prompt": "Each employee has one unique locker, and each locker has one employee. What relationship is described?",
        "answer": "One-to-one",
        "options": [
          "One-to-one",
          "Many-to-many",
          "One-to-many",
          "Recursive only"
        ],
        "explanation": "The stated rules allow one related instance on each side.",
        "skill": "Entity relationships"
      },
      {
        "id": "13-relationships-8",
        "prompt": "Can a foreign-key value repeat across several child records?",
        "answer": "Yes",
        "options": [
          "Yes",
          "No, never",
          "Only if it is plaintext",
          "Only in a one-to-one relationship"
        ],
        "explanation": "Several orders may reference the same customer, so a foreign key is not generally unique.",
        "skill": "Entity relationships"
      },
      {
        "id": "13-relationships-9",
        "prompt": "Why create an OrderLine linking entity between Order and Product?",
        "answer": "Store products on each order",
        "options": [
          "Store products on each order",
          "Make every product unique per shop",
          "Remove the need for orders",
          "Put product lists into one field"
        ],
        "explanation": "OrderLine represents the many-to-many relationship and can hold attributes such as quantity.",
        "skill": "Entity relationships"
      },
      {
        "id": "13-relationships-10",
        "prompt": "Where does Quantity belong when it describes a product on one specific order?",
        "answer": "OrderLine",
        "options": [
          "OrderLine",
          "Customer surname",
          "Product category only",
          "The database name"
        ],
        "explanation": "Quantity depends on the order-product association, rather than solely on the customer or product.",
        "skill": "Entity relationships"
      }
    ]
  },
  {
    "id": "13-normal12",
    "section": "1.3",
    "spec": "1.3.2(a,c)",
    "title": "First and second normal form",
    "lessons": [
      136
    ],
    "page": 103,
    "questions": [
      {
        "id": "13-normal12-1",
        "prompt": "Which change is needed when one cell contains a list of phone numbers?",
        "answer": "Store individual values separately",
        "options": [
          "Store individual values separately",
          "Encrypt the list",
          "Rename the field",
          "Sort the list alphabetically"
        ],
        "explanation": "First normal form requires atomic values and no repeating groups; design separate rows or a related table for multiple numbers.",
        "skill": "First and second normal form"
      },
      {
        "id": "13-normal12-2",
        "prompt": "What additional condition defines 2NF after 1NF?",
        "answer": "No partial key dependencies",
        "options": [
          "No partial key dependencies",
          "No foreign keys",
          "Every table has one column",
          "No repeated foreign-key values"
        ],
        "explanation": "Each non-key attribute must depend on the whole of each candidate key, avoiding partial dependencies.",
        "skill": "First and second normal form"
      },
      {
        "id": "13-normal12-3",
        "prompt": "With key (PupilID, CourseID), PupilName depends only on PupilID. What problem is present?",
        "answer": "Partial dependency",
        "options": [
          "Partial dependency",
          "No dependency",
          "Only a hash collision",
          "A mandatory 3NF design"
        ],
        "explanation": "PupilName depends on part of the composite key, so keeping it here violates 2NF.",
        "skill": "First and second normal form"
      },
      {
        "id": "13-normal12-4",
        "prompt": "How should a partial dependency of PupilName on PupilID be removed?",
        "answer": "Move names into Pupil",
        "options": [
          "Move names into Pupil",
          "Delete all pupil IDs",
          "Store names twice",
          "Add a second name column"
        ],
        "explanation": "A Pupil table can store PupilID and PupilName once; enrolments retain the pupil foreign key.",
        "skill": "First and second normal form"
      },
      {
        "id": "13-normal12-5",
        "prompt": "Under key (PupilID, CourseID), Mark depends on both IDs. Where does it belong?",
        "answer": "Enrolment",
        "options": [
          "Enrolment",
          "Pupil only",
          "Course only",
          "Neither table ever"
        ],
        "explanation": "The mark describes one pupil taking one course, so it depends on the full composite key.",
        "skill": "First and second normal form"
      },
      {
        "id": "13-normal12-6",
        "prompt": "Why does a single-attribute candidate key have no proper non-empty key subset?",
        "answer": "It has only one attribute",
        "options": [
          "It has only one attribute",
          "It has no unique values",
          "It is always a foreign key",
          "It forbids every dependency"
        ],
        "explanation": "Partial dependency requires dependence on only part of a composite key; an indivisible single-attribute key has no such subset.",
        "skill": "First and second normal form"
      },
      {
        "id": "13-normal12-7",
        "prompt": "A table has Course1, Course2 and Course3 columns for each pupil. What is the issue?",
        "answer": "A repeating group",
        "options": [
          "A repeating group",
          "A valid composite key by itself",
          "An encrypted relationship",
          "A required SQL join"
        ],
        "explanation": "Repeating course columns should become separate related records rather than a fixed group of similar fields.",
        "skill": "First and second normal form"
      },
      {
        "id": "13-normal12-8",
        "prompt": "Normalisation primarily reduces which risk?",
        "answer": "Update anomalies from duplication",
        "options": [
          "Update anomalies from duplication",
          "Every possible hardware failure",
          "The need to validate input",
          "All query processing"
        ],
        "explanation": "Separating dependencies reduces inconsistent repeated facts, as well as insertion and deletion anomalies.",
        "skill": "First and second normal form"
      },
      {
        "id": "13-normal12-9",
        "prompt": "If key (OrderID, ProductID) determines Quantity but ProductID alone determines ProductName, which field should move to Product?",
        "answer": "ProductName",
        "options": [
          "ProductName",
          "Quantity",
          "OrderID",
          "The whole primary key"
        ],
        "explanation": "ProductName depends only on ProductID; Quantity depends on the order-product combination.",
        "skill": "First and second normal form"
      },
      {
        "id": "13-normal12-10",
        "prompt": "A relation is in 1NF but has a non-key field depending on only half its composite key. What is its highest stated normal form?",
        "answer": "1NF",
        "options": [
          "1NF",
          "2NF",
          "3NF",
          "No table can exist"
        ],
        "explanation": "The partial dependency prevents 2NF, while the question states that 1NF already holds.",
        "skill": "First and second normal form"
      }
    ]
  },
  {
    "id": "13-normal3",
    "section": "1.3",
    "spec": "1.3.2(a,c)",
    "title": "Third normal form and anomalies",
    "lessons": [
      137
    ],
    "page": 103,
    "questions": [
      {
        "id": "13-normal3-1",
        "prompt": "A 2NF table has PupilID → TutorID → TutorRoom. What problem prevents 3NF?",
        "answer": "Transitive dependency",
        "options": [
          "Transitive dependency",
          "Partial dependency on PupilID",
          "Missing HTML markup",
          "A repeated primary key necessarily"
        ],
        "explanation": "TutorRoom depends on the pupil key through the non-key TutorID, creating a transitive dependency.",
        "skill": "Third normal form and anomalies"
      },
      {
        "id": "13-normal3-2",
        "prompt": "How should TutorRoom be stored to remove PupilID → TutorID → TutorRoom?",
        "answer": "In Tutor keyed by TutorID",
        "options": [
          "In Tutor keyed by TutorID",
          "Duplicated in each pupil row",
          "Inside PupilID",
          "As a list of room histories only"
        ],
        "explanation": "Store each tutor’s room once in Tutor; Pupil keeps TutorID as a foreign key.",
        "skill": "Third normal form and anomalies"
      },
      {
        "id": "13-normal3-3",
        "prompt": "What is an update anomaly?",
        "answer": "Repeated facts become inconsistent",
        "options": [
          "Repeated facts become inconsistent",
          "A query returns no columns",
          "Every primary key is too long",
          "SQL always sorts ascending"
        ],
        "explanation": "Changing only some duplicated copies of a fact can leave conflicting values in the database.",
        "skill": "Third normal form and anomalies"
      },
      {
        "id": "13-normal3-4",
        "prompt": "Deleting the last enrolment also removes the only stored course description. What anomaly is illustrated?",
        "answer": "Deletion anomaly",
        "options": [
          "Deletion anomaly",
          "Encryption failure",
          "Hash collision",
          "Index balancing"
        ],
        "explanation": "An unrelated fact is lost when the row containing its only copy is deleted.",
        "skill": "Third normal form and anomalies"
      },
      {
        "id": "13-normal3-5",
        "prompt": "A course cannot be added until a pupil enrols because both facts share one compulsory record. What anomaly is this?",
        "answer": "Insertion anomaly",
        "options": [
          "Insertion anomaly",
          "A DNS cache hit",
          "A successful join",
          "A locking guarantee"
        ],
        "explanation": "The design prevents recording a course independently of an enrolment that may not yet exist.",
        "skill": "Third normal form and anomalies"
      },
      {
        "id": "13-normal3-6",
        "prompt": "A 2NF table has EmployeeID → DeptID and DeptID → DeptName. Which decomposition removes the transitive dependency?",
        "answer": "Employee plus Department",
        "options": [
          "Employee plus Department",
          "One field containing every name",
          "Two duplicate Employee tables",
          "Remove DeptID from both tables"
        ],
        "explanation": "Employee stores its department reference; Department stores the department name under DeptID.",
        "skill": "Third normal form and anomalies"
      },
      {
        "id": "13-normal3-7",
        "prompt": "Does a well-normalised database forbid repeated foreign-key values?",
        "answer": "No",
        "options": [
          "No",
          "Yes, every value is unique",
          "Only if SQL is used",
          "Only for integer keys"
        ],
        "explanation": "Repeated links, such as many employees in one department, are legitimate; normalisation removes redundant facts.",
        "skill": "Third normal form and anomalies"
      },
      {
        "id": "13-normal3-8",
        "prompt": "What possible cost comes with splitting a relation into more tables?",
        "answer": "More joins for some queries",
        "options": [
          "More joins for some queries",
          "No ability to keep keys",
          "Certain loss of all data",
          "No possibility of constraints"
        ],
        "explanation": "Queries combining related entities may need joins, so normalisation involves design and performance considerations.",
        "skill": "Third normal form and anomalies"
      },
      {
        "id": "13-normal3-9",
        "prompt": "Under OrderID → CustomerID → CustomerName, which non-key attribute depends transitively on OrderID?",
        "answer": "CustomerName",
        "options": [
          "CustomerName",
          "OrderID",
          "No attribute",
          "The SQL keyword SELECT"
        ],
        "explanation": "CustomerName is obtained through CustomerID rather than depending directly on the order alone.",
        "skill": "Third normal form and anomalies"
      },
      {
        "id": "13-normal3-10",
        "prompt": "After removing partial and transitive non-key dependencies from a 1NF design, which target has been reached in this syllabus model?",
        "answer": "3NF",
        "options": [
          "3NF",
          "Only unnormalised form",
          "Only 1NF",
          "A flat text archive"
        ],
        "explanation": "For these examples, 2NF removes partial dependencies and 3NF removes transitive non-key dependencies.",
        "skill": "Third normal form and anomalies"
      }
    ]
  },
  {
    "id": "13-sql-select",
    "section": "1.3",
    "spec": "1.3.2(d)",
    "title": "SQL SELECT, filters and sorting",
    "lessons": [
      138
    ],
    "page": 88,
    "questions": [
      {
        "id": "13-sql-select-1",
        "prompt": "Which names does this SQL return from the Pupil table?",
        "answer": "Ava and Dan",
        "options": [
          "Ava and Dan",
          "Ava and Ben",
          "Cara only",
          "All four names"
        ],
        "explanation": "The WHERE condition keeps the two records whose Year value is 12.",
        "skill": "SQL SELECT, filters and sorting",
        "code": "SELECT Name FROM Pupil\nWHERE Year = 12;",
        "table": {
          "caption": "Pupil table · ID is the primary key",
          "headers": [
            "ID",
            "Name",
            "Year",
            "Score"
          ],
          "rows": [
            [
              "1",
              "Ava",
              "12",
              "60"
            ],
            [
              "2",
              "Ben",
              "13",
              "45"
            ],
            [
              "3",
              "Cara",
              "13",
              "90"
            ],
            [
              "4",
              "Dan",
              "12",
              "75"
            ]
          ]
        },
        "language": "SQL"
      },
      {
        "id": "13-sql-select-2",
        "prompt": "Which ID is returned by this SELECT on the Pupil table?",
        "answer": "4",
        "options": [
          "4",
          "1",
          "2",
          "3"
        ],
        "explanation": "Only Dan has both Year = 12 and Score greater than 60; Ava’s score is exactly 60.",
        "skill": "SQL SELECT, filters and sorting",
        "code": "SELECT ID FROM Pupil\nWHERE Year = 12\nAND Score > 60;",
        "table": {
          "caption": "Pupil table · ID is the primary key",
          "headers": [
            "ID",
            "Name",
            "Year",
            "Score"
          ],
          "rows": [
            [
              "1",
              "Ava",
              "12",
              "60"
            ],
            [
              "2",
              "Ben",
              "13",
              "45"
            ],
            [
              "3",
              "Cara",
              "13",
              "90"
            ],
            [
              "4",
              "Dan",
              "12",
              "75"
            ]
          ]
        },
        "language": "SQL"
      },
      {
        "id": "13-sql-select-3",
        "prompt": "Which name is first when the result is ordered by Score DESC?",
        "answer": "Cara",
        "options": [
          "Cara",
          "Ava",
          "Ben",
          "Dan"
        ],
        "explanation": "Descending score order starts with the largest value, which is Cara’s 90.",
        "skill": "SQL SELECT, filters and sorting",
        "code": "SELECT Name FROM Pupil\nORDER BY Score DESC;",
        "table": {
          "caption": "Pupil table · ID is the primary key",
          "headers": [
            "ID",
            "Name",
            "Year",
            "Score"
          ],
          "rows": [
            [
              "1",
              "Ava",
              "12",
              "60"
            ],
            [
              "2",
              "Ben",
              "13",
              "45"
            ],
            [
              "3",
              "Cara",
              "13",
              "90"
            ],
            [
              "4",
              "Dan",
              "12",
              "75"
            ]
          ]
        },
        "language": "SQL"
      },
      {
        "id": "13-sql-select-4",
        "prompt": "What does SELECT Name specify in an SQL query?",
        "answer": "The column to retrieve",
        "options": [
          "The column to retrieve",
          "The rows to delete",
          "The primary key to create",
          "The server password"
        ],
        "explanation": "The SELECT list identifies output columns; row filtering is handled by WHERE.",
        "skill": "SQL SELECT, filters and sorting"
      },
      {
        "id": "13-sql-select-5",
        "prompt": "What does this LIKE condition match?",
        "answer": "Names beginning with A",
        "options": [
          "Names beginning with A",
          "Names ending with A only",
          "Names containing exactly one A",
          "Names of length one only"
        ],
        "explanation": "In SQL LIKE, the percent wildcard matches zero or more characters after the initial A.",
        "skill": "SQL SELECT, filters and sorting",
        "code": "SELECT Name FROM Pupil\nWHERE Name LIKE 'A%';",
        "table": {
          "caption": "Pupil table · ID is the primary key",
          "headers": [
            "ID",
            "Name",
            "Year",
            "Score"
          ],
          "rows": [
            [
              "1",
              "Ava",
              "12",
              "60"
            ],
            [
              "2",
              "Ben",
              "13",
              "45"
            ],
            [
              "3",
              "Cara",
              "13",
              "90"
            ],
            [
              "4",
              "Dan",
              "12",
              "75"
            ]
          ]
        },
        "language": "SQL"
      },
      {
        "id": "13-sql-select-6",
        "prompt": "Which names satisfy this OR condition?",
        "answer": "Ava, Ben and Dan",
        "options": [
          "Ava, Ben and Dan",
          "Cara only",
          "Ava and Dan only",
          "Ben and Cara only"
        ],
        "explanation": "Year 12 selects Ava and Dan; Score below 50 additionally selects Ben.",
        "skill": "SQL SELECT, filters and sorting",
        "code": "SELECT Name FROM Pupil\nWHERE Year = 12\nOR Score < 50;",
        "table": {
          "caption": "Pupil table · ID is the primary key",
          "headers": [
            "ID",
            "Name",
            "Year",
            "Score"
          ],
          "rows": [
            [
              "1",
              "Ava",
              "12",
              "60"
            ],
            [
              "2",
              "Ben",
              "13",
              "45"
            ],
            [
              "3",
              "Cara",
              "13",
              "90"
            ],
            [
              "4",
              "Dan",
              "12",
              "75"
            ]
          ]
        },
        "language": "SQL"
      },
      {
        "id": "13-sql-select-7",
        "prompt": "Which names satisfy this inclusive score range?",
        "answer": "Ava and Dan",
        "options": [
          "Ava and Dan",
          "Ava only",
          "Dan and Cara",
          "Ben only"
        ],
        "explanation": "BETWEEN includes both endpoints, so scores 60 and 75 meet the range.",
        "skill": "SQL SELECT, filters and sorting",
        "code": "SELECT Name FROM Pupil\nWHERE Score BETWEEN 60 AND 75;",
        "table": {
          "caption": "Pupil table · ID is the primary key",
          "headers": [
            "ID",
            "Name",
            "Year",
            "Score"
          ],
          "rows": [
            [
              "1",
              "Ava",
              "12",
              "60"
            ],
            [
              "2",
              "Ben",
              "13",
              "45"
            ],
            [
              "3",
              "Cara",
              "13",
              "90"
            ],
            [
              "4",
              "Dan",
              "12",
              "75"
            ]
          ]
        },
        "language": "SQL"
      },
      {
        "id": "13-sql-select-8",
        "prompt": "What is the difference between WHERE and ORDER BY?",
        "answer": "Filtering versus sorting",
        "options": [
          "Filtering versus sorting",
          "Both delete records",
          "Both create tables",
          "Sorting versus encryption"
        ],
        "explanation": "WHERE chooses which rows qualify; ORDER BY arranges the resulting rows.",
        "skill": "SQL SELECT, filters and sorting"
      },
      {
        "id": "13-sql-select-9",
        "prompt": "Which query returns each represented Year value once?",
        "answer": "SELECT DISTINCT Year FROM Pupil;",
        "options": [
          "SELECT DISTINCT Year FROM Pupil;",
          "SELECT Year FROM Pupil;",
          "DELETE Year FROM Pupil;",
          "DROP TABLE Pupil;"
        ],
        "explanation": "DISTINCT removes duplicate values from the selected result, without deleting stored records.",
        "skill": "SQL SELECT, filters and sorting"
      },
      {
        "id": "13-sql-select-10",
        "prompt": "How many rows satisfy this AND filter?",
        "answer": "0",
        "options": [
          "0",
          "1",
          "2",
          "4"
        ],
        "explanation": "No pupil has both Year 13 and Score greater than 95, so the result is empty.",
        "skill": "SQL SELECT, filters and sorting",
        "code": "SELECT Name FROM Pupil\nWHERE Year = 13\nAND Score > 95;",
        "table": {
          "caption": "Pupil table · ID is the primary key",
          "headers": [
            "ID",
            "Name",
            "Year",
            "Score"
          ],
          "rows": [
            [
              "1",
              "Ava",
              "12",
              "60"
            ],
            [
              "2",
              "Ben",
              "13",
              "45"
            ],
            [
              "3",
              "Cara",
              "13",
              "90"
            ],
            [
              "4",
              "Dan",
              "12",
              "75"
            ]
          ]
        },
        "language": "SQL"
      }
    ]
  },
  {
    "id": "13-sql-join",
    "section": "1.3",
    "spec": "1.3.2(d)",
    "title": "SQL joins and nested queries",
    "lessons": [
      138,
      278
    ],
    "page": 104,
    "questions": [
      {
        "id": "13-sql-join-1",
        "prompt": "Customer has IDs 1=Ava, 2=Ben. OrderRow links 10→1, 11→1 and 12→2. How many rows does their matching INNER JOIN return?",
        "answer": "3",
        "options": [
          "3",
          "2",
          "1",
          "6"
        ],
        "explanation": "Each of the three orders matches exactly one customer, giving three joined rows.",
        "skill": "SQL joins and nested queries"
      },
      {
        "id": "13-sql-join-2",
        "prompt": "In a Customer–OrderRow join, which condition connects matching customers and orders?",
        "answer": "Customer.ID = OrderRow.CustomerID",
        "options": [
          "Customer.ID = OrderRow.CustomerID",
          "Customer.ID = OrderRow.OrderID",
          "Customer.Name = OrderRow.OrderID",
          "Customer.ID > OrderRow.CustomerID"
        ],
        "explanation": "The parent primary key is matched with the child foreign key representing that relationship.",
        "skill": "SQL joins and nested queries"
      },
      {
        "id": "13-sql-join-3",
        "prompt": "What does INNER JOIN do with a row that has no matching row under its join condition?",
        "answer": "Exclude it from the result",
        "options": [
          "Exclude it from the result",
          "Invent a matching record",
          "Delete it from storage",
          "Always return it twice"
        ],
        "explanation": "An inner join returns combinations that satisfy its join condition; it does not change stored rows.",
        "skill": "SQL joins and nested queries"
      },
      {
        "id": "13-sql-join-4",
        "prompt": "A Course table has IDs 1, 2 and 3. Enrolment contains CourseID 1, 1 and 3. Which course IDs does this nested query return?",
        "answer": "1 and 3",
        "options": [
          "1 and 3",
          "1 only",
          "2 only",
          "1, 2 and 3"
        ],
        "explanation": "IN tests membership of the inner result; repeated 1s do not cause repeated Course rows.",
        "skill": "SQL joins and nested queries",
        "code": "SELECT CourseID FROM Course\nWHERE CourseID IN\n(SELECT CourseID FROM Enrolment);",
        "language": "SQL"
      },
      {
        "id": "13-sql-join-5",
        "prompt": "Why qualify ID as Customer.ID in a join when both tables contain ID?",
        "answer": "Avoid an ambiguous column reference",
        "options": [
          "Avoid an ambiguous column reference",
          "Make ID a password",
          "Force all rows to match",
          "Remove the foreign key"
        ],
        "explanation": "The table name identifies which ID column is intended.",
        "skill": "SQL joins and nested queries"
      },
      {
        "id": "13-sql-join-6",
        "prompt": "Customer has 1=Ava, 2=Ben and 3=Cal. Orders reference 1 twice and 2 once. Who is absent from the inner-join result?",
        "answer": "Cal",
        "options": [
          "Cal",
          "Ava",
          "Ben",
          "Nobody"
        ],
        "explanation": "Customer 3 has no matching order and is therefore absent from this inner join.",
        "skill": "SQL joins and nested queries"
      },
      {
        "id": "13-sql-join-7",
        "prompt": "How many combinations result from joining two rows with three rows when every pair is allowed?",
        "answer": "6",
        "options": [
          "6",
          "2",
          "3",
          "5"
        ],
        "explanation": "A Cartesian combination pairs each of the two rows with each of the three: 2 times 3 = 6.",
        "skill": "SQL joins and nested queries"
      },
      {
        "id": "13-sql-join-8",
        "prompt": "In SELECT O.OrderID FROM OrderRow AS O, what is O?",
        "answer": "A table alias",
        "options": [
          "A table alias",
          "A new stored table",
          "An encryption key",
          "A wildcard"
        ],
        "explanation": "An alias is a temporary name used to refer to a table within the query.",
        "skill": "SQL joins and nested queries"
      },
      {
        "id": "13-sql-join-9",
        "prompt": "A nested query returns IDs 2 and 5. Which outer values pass WHERE ID IN (...) ?",
        "answer": "2 and 5",
        "options": [
          "2 and 5",
          "Every ID below 5",
          "Only 2",
          "Only the first returned ID"
        ],
        "explanation": "IN accepts any value equal to a member of the subquery result.",
        "skill": "SQL joins and nested queries"
      },
      {
        "id": "13-sql-join-10",
        "prompt": "Why is joining on a non-unique surname risky when a CustomerID foreign key exists?",
        "answer": "It can create wrong matches",
        "options": [
          "It can create wrong matches",
          "Names are never text",
          "SQL forbids all text joins",
          "It always encrypts results"
        ],
        "explanation": "Different customers can share a surname; key-based joins match the intended customer identity.",
        "skill": "SQL joins and nested queries"
      }
    ]
  },
  {
    "id": "13-sql-modify",
    "section": "1.3",
    "spec": "1.3.2(d)",
    "title": "SQL INSERT, UPDATE, DELETE and DROP",
    "lessons": [
      139,
      279
    ],
    "page": 104,
    "questions": [
      {
        "id": "13-sql-modify-1",
        "prompt": "What does INSERT INTO add to a database table?",
        "answer": "New records",
        "options": [
          "New records",
          "A new DNS server",
          "Only an index",
          "A display font"
        ],
        "explanation": "INSERT adds rows with the specified field values to an existing table.",
        "skill": "SQL INSERT, UPDATE, DELETE and DROP"
      },
      {
        "id": "13-sql-modify-2",
        "prompt": "What does this UPDATE change?",
        "answer": "Score for ID 2",
        "options": [
          "Score for ID 2",
          "Every pupil’s score",
          "Pupil ID 80",
          "The table name"
        ],
        "explanation": "The WHERE clause restricts the update to the row whose ID equals 2.",
        "skill": "SQL INSERT, UPDATE, DELETE and DROP",
        "code": "UPDATE Pupil SET Score = 80\nWHERE ID = 2;",
        "language": "SQL"
      },
      {
        "id": "13-sql-modify-3",
        "prompt": "What is the usual effect of DELETE FROM Pupil with no WHERE clause?",
        "answer": "Remove all rows",
        "options": [
          "Remove all rows",
          "Remove only the first row",
          "Remove the table definition",
          "Sort all rows"
        ],
        "explanation": "DELETE without a row condition deletes all records in the table while retaining its structure, subject to constraints.",
        "skill": "SQL INSERT, UPDATE, DELETE and DROP"
      },
      {
        "id": "13-sql-modify-4",
        "prompt": "How does DROP TABLE Pupil differ from deleting its rows?",
        "answer": "It removes the table itself",
        "options": [
          "It removes the table itself",
          "It removes only matching rows",
          "It only changes column values",
          "It creates a backup"
        ],
        "explanation": "DROP TABLE removes the table definition and its stored rows, subject to database rules and dependencies.",
        "skill": "SQL INSERT, UPDATE, DELETE and DROP"
      },
      {
        "id": "13-sql-modify-5",
        "prompt": "What is the main purpose of WHERE in DELETE?",
        "answer": "Limit which rows are removed",
        "options": [
          "Limit which rows are removed",
          "Select the display font",
          "Rename the table",
          "Remove every column name"
        ],
        "explanation": "A WHERE condition identifies the records that should be deleted.",
        "skill": "SQL INSERT, UPDATE, DELETE and DROP"
      },
      {
        "id": "13-sql-modify-6",
        "prompt": "What does this INSERT statement add?",
        "answer": "ID 5, name Eli, year 12",
        "options": [
          "ID 5, name Eli, year 12",
          "ID 12, name Eli, year 5",
          "A new table named Eli",
          "Three unrelated records"
        ],
        "explanation": "The values correspond in order to the listed columns ID, Name and Year.",
        "skill": "SQL INSERT, UPDATE, DELETE and DROP",
        "code": "INSERT INTO Pupil\n(ID, Name, Year)\nVALUES (5, 'Eli', 12);",
        "language": "SQL"
      },
      {
        "id": "13-sql-modify-7",
        "prompt": "What is the risk of omitting WHERE from this intended single-pupil UPDATE?",
        "answer": "All rows may be changed",
        "options": [
          "All rows may be changed",
          "The query becomes a SELECT",
          "Only column names change",
          "The primary key vanishes"
        ],
        "explanation": "An unrestricted UPDATE applies its assignment to all rows in the target table, subject to constraints.",
        "skill": "SQL INSERT, UPDATE, DELETE and DROP",
        "code": "UPDATE Pupil SET Year = 13;",
        "language": "SQL"
      },
      {
        "id": "13-sql-modify-8",
        "prompt": "Which statement removes only the pupil whose ID is 3?",
        "answer": "DELETE FROM Pupil WHERE ID = 3;",
        "options": [
          "DELETE FROM Pupil WHERE ID = 3;",
          "DROP TABLE Pupil;",
          "DELETE FROM Pupil;",
          "SELECT * FROM Pupil WHERE ID = 3;"
        ],
        "explanation": "DELETE with the key condition targets the intended row; SELECT only reads it.",
        "skill": "SQL INSERT, UPDATE, DELETE and DROP"
      },
      {
        "id": "13-sql-modify-9",
        "prompt": "Which SQL command changes values in existing records?",
        "answer": "UPDATE",
        "options": [
          "UPDATE",
          "INSERT",
          "SELECT",
          "DROP"
        ],
        "explanation": "UPDATE modifies existing rows; INSERT creates new rows and SELECT retrieves data.",
        "skill": "SQL INSERT, UPDATE, DELETE and DROP"
      },
      {
        "id": "13-sql-modify-10",
        "prompt": "After this DELETE, which ID remains if the original IDs are 1, 2, 3 and 4?",
        "answer": "1 and 4",
        "options": [
          "1 and 4",
          "2 and 3",
          "1 only",
          "All four"
        ],
        "explanation": "The condition removes IDs 2 and 3, leaving IDs 1 and 4.",
        "skill": "SQL INSERT, UPDATE, DELETE and DROP",
        "code": "DELETE FROM Pupil\nWHERE ID IN (2, 3);",
        "language": "SQL"
      }
    ]
  },
  {
    "id": "13-data-exchange",
    "section": "1.3",
    "spec": "1.3.2(b)",
    "title": "Capturing, selecting and exchanging data",
    "lessons": [
      134,
      281
    ],
    "page": 95,
    "questions": [
      {
        "id": "13-data-exchange-1",
        "prompt": "A shop records product codes at checkout. Which capture method reduces manual typing?",
        "answer": "Barcode scanning",
        "options": [
          "Barcode scanning",
          "Sorting by price",
          "Normalising a name",
          "Running a backup"
        ],
        "explanation": "A scanner captures a product identifier directly, reducing typing and transcription errors.",
        "skill": "Capturing, selecting and exchanging data"
      },
      {
        "id": "13-data-exchange-2",
        "prompt": "What is validation designed to check?",
        "answer": "Whether data meets stated rules",
        "options": [
          "Whether data meets stated rules",
          "Whether every value is true",
          "Whether a user is honest",
          "Whether a file is encrypted"
        ],
        "explanation": "Validation checks acceptability against rules; an acceptable value can still be factually wrong.",
        "skill": "Capturing, selecting and exchanging data"
      },
      {
        "id": "13-data-exchange-3",
        "prompt": "A pupil’s age is entered as 125 in a school form. Which check can reject it?",
        "answer": "Range check",
        "options": [
          "Range check",
          "Primary-key join",
          "Descending sort",
          "Dictionary coding"
        ],
        "explanation": "A sensible allowed age interval can reject values outside the range.",
        "skill": "Capturing, selecting and exchanging data"
      },
      {
        "id": "13-data-exchange-4",
        "prompt": "How does verification differ from validation?",
        "answer": "It checks copying accuracy",
        "options": [
          "It checks copying accuracy",
          "It guarantees real-world truth",
          "It always rejects duplicates",
          "It replaces every input rule"
        ],
        "explanation": "Verification compares an entry with its source or repeated entry to detect copying errors.",
        "skill": "Capturing, selecting and exchanging data"
      },
      {
        "id": "13-data-exchange-5",
        "prompt": "Which operation selects only unpaid invoices from stored data?",
        "answer": "A query with a suitable filter",
        "options": [
          "A query with a suitable filter",
          "Deleting every paid customer",
          "Changing the database font",
          "Encrypting the table name"
        ],
        "explanation": "A condition such as Paid = false retrieves the required subset without altering unrelated records.",
        "skill": "Capturing, selecting and exchanging data"
      },
      {
        "id": "13-data-exchange-6",
        "prompt": "What is an advantage of a drop-down list for a known set of departments?",
        "answer": "Consistent permitted values",
        "options": [
          "Consistent permitted values",
          "Proof of the user’s identity",
          "Unlimited new department values",
          "Automatic encryption of choices"
        ],
        "explanation": "Controlled choices reduce spelling variations and invalid department names, though users can still choose the wrong item.",
        "skill": "Capturing, selecting and exchanging data"
      },
      {
        "id": "13-data-exchange-7",
        "prompt": "Why agree field names and formats when exchanging data between systems?",
        "answer": "Make the meaning interpretable",
        "options": [
          "Make the meaning interpretable",
          "Remove every need for security",
          "Make all records anonymous",
          "Guarantee the data is accurate"
        ],
        "explanation": "The receiving system needs to understand which values represent each field and how they are encoded.",
        "skill": "Capturing, selecting and exchanging data"
      },
      {
        "id": "13-data-exchange-8",
        "prompt": "A CSV export contains a comma inside a customer name. What is needed?",
        "answer": "Correct quoting or escaping",
        "options": [
          "Correct quoting or escaping",
          "Deleting every comma in all data",
          "Turning the name into a key",
          "Using lossy compression"
        ],
        "explanation": "Delimiters within data need the format’s quoting or escaping rules so fields are parsed correctly.",
        "skill": "Capturing, selecting and exchanging data"
      },
      {
        "id": "13-data-exchange-9",
        "prompt": "Why validate records imported from another organisation?",
        "answer": "Their rules may differ",
        "options": [
          "Their rules may differ",
          "Imported data is always malicious",
          "CSV files cannot contain numbers",
          "Foreign systems have no schemas"
        ],
        "explanation": "Data that passed the sender’s checks may still violate the receiving system’s types, ranges or relationships.",
        "skill": "Capturing, selecting and exchanging data"
      },
      {
        "id": "13-data-exchange-10",
        "prompt": "Which approach can exchange structured records directly between applications?",
        "answer": "An agreed API data format",
        "options": [
          "An agreed API data format",
          "A screenshot of the screen only",
          "Changing every field to a picture",
          "Removing field definitions"
        ],
        "explanation": "An API with a defined structure such as JSON or XML supports machine-readable exchange between systems.",
        "skill": "Capturing, selecting and exchanging data"
      }
    ]
  },
  {
    "id": "13-integrity-index",
    "section": "1.3",
    "spec": "1.3.2(a,e)",
    "title": "Referential integrity and indexing",
    "lessons": [
      140
    ],
    "page": 81,
    "questions": [
      {
        "id": "13-integrity-index-1",
        "prompt": "An Order references CustomerID 17, but no Customer 17 exists. What rule is broken?",
        "answer": "Referential integrity",
        "options": [
          "Referential integrity",
          "Descending ordering",
          "Lossless compression",
          "A CSS selector rule"
        ],
        "explanation": "A non-null foreign key must reference an existing permitted parent key.",
        "skill": "Referential integrity and indexing"
      },
      {
        "id": "13-integrity-index-2",
        "prompt": "Customer 5 has related orders. Why might deleting Customer 5 be rejected?",
        "answer": "It would leave orphaned orders",
        "options": [
          "It would leave orphaned orders",
          "Every customer name is unique",
          "Orders must never be stored",
          "Indexes forbid all deletion"
        ],
        "explanation": "The database can restrict deletion to preserve references from child orders, depending on the defined constraint.",
        "skill": "Referential integrity and indexing"
      },
      {
        "id": "13-integrity-index-3",
        "prompt": "What is an orphaned child record?",
        "answer": "A record pointing to a missing parent",
        "options": [
          "A record pointing to a missing parent",
          "Any row with a composite key",
          "A row returned by SELECT",
          "An encrypted backup"
        ],
        "explanation": "A child row becomes orphaned when its foreign-key reference no longer has a matching parent.",
        "skill": "Referential integrity and indexing"
      },
      {
        "id": "13-integrity-index-4",
        "prompt": "Can referential integrity prove a correctly referenced order belongs to the right real customer?",
        "answer": "No",
        "options": [
          "No",
          "Yes, always",
          "Only for integer keys",
          "Only after sorting"
        ],
        "explanation": "It checks existence of the referenced key, not the real-world truth of the chosen customer.",
        "skill": "Referential integrity and indexing"
      },
      {
        "id": "13-integrity-index-5",
        "prompt": "What is the purpose of a database index?",
        "answer": "Speed selected lookups",
        "options": [
          "Speed selected lookups",
          "Encrypt every record",
          "Remove the need for keys",
          "Guarantee all data is correct"
        ],
        "explanation": "An index provides a search structure linking indexed values to records, which can speed suitable queries.",
        "skill": "Referential integrity and indexing"
      },
      {
        "id": "13-integrity-index-6",
        "prompt": "What is a common cost of maintaining an index?",
        "answer": "Extra storage and update work",
        "options": [
          "Extra storage and update work",
          "No ability to run SELECT",
          "Loss of all primary keys",
          "Every query must be slower"
        ],
        "explanation": "Indexes take storage and must be updated when relevant data changes.",
        "skill": "Referential integrity and indexing"
      },
      {
        "id": "13-integrity-index-7",
        "prompt": "A foreign key is optional and nulls are allowed. Must every child row refer to a parent?",
        "answer": "No, null can mean no reference",
        "options": [
          "No, null can mean no reference",
          "Yes, null always refers to row zero",
          "Yes, null is always a missing parent",
          "No foreign keys can be checked"
        ],
        "explanation": "A permitted null represents an absent relationship; non-null values must satisfy the foreign-key constraint.",
        "skill": "Referential integrity and indexing"
      },
      {
        "id": "13-integrity-index-8",
        "prompt": "What can ON DELETE CASCADE do when a parent is deleted?",
        "answer": "Delete its dependent child rows",
        "options": [
          "Delete its dependent child rows",
          "Encrypt the child rows",
          "Copy children to every table",
          "Always reject the parent deletion"
        ],
        "explanation": "A defined cascading action deletes related child rows automatically; this must match the intended data policy.",
        "skill": "Referential integrity and indexing"
      },
      {
        "id": "13-integrity-index-9",
        "prompt": "Why might an index on a frequently searched surname help?",
        "answer": "Avoid scanning every row",
        "options": [
          "Avoid scanning every row",
          "Make all surnames unique",
          "Prevent every misspelling",
          "Replace the Name field"
        ],
        "explanation": "A suitable index can locate matching records without checking each table row individually.",
        "skill": "Referential integrity and indexing"
      },
      {
        "id": "13-integrity-index-10",
        "prompt": "A foreign key references CustomerID 8, which exists. Several orders use 8. Is repetition alone an integrity error?",
        "answer": "No",
        "options": [
          "No",
          "Yes, foreign keys are always unique",
          "Yes, only text keys may repeat",
          "Only if orders are sorted"
        ],
        "explanation": "Many child rows can legitimately reference one parent in a one-to-many relationship.",
        "skill": "Referential integrity and indexing"
      }
    ]
  },
  {
    "id": "13-transactions",
    "section": "1.3",
    "spec": "1.3.2(f)",
    "title": "ACID, record locking and redundancy",
    "lessons": [
      141,
      281
    ],
    "page": 105,
    "questions": [
      {
        "id": "13-transactions-1",
        "prompt": "A transfer must debit A and credit B together or do neither. Which ACID property is this?",
        "answer": "Atomicity",
        "options": [
          "Atomicity",
          "Isolation",
          "Durability",
          "Consistency only"
        ],
        "explanation": "Atomicity makes the transaction an all-or-nothing unit so a partial transfer is rolled back.",
        "skill": "ACID, record locking and redundancy"
      },
      {
        "id": "13-transactions-2",
        "prompt": "Which ACID property preserves defined database rules across a transaction?",
        "answer": "Consistency",
        "options": [
          "Consistency",
          "Durability",
          "Atomicity only",
          "Availability"
        ],
        "explanation": "Consistency means a valid transaction takes the database from one state satisfying its constraints to another.",
        "skill": "ACID, record locking and redundancy"
      },
      {
        "id": "13-transactions-3",
        "prompt": "Which ACID property controls interference between concurrent transactions?",
        "answer": "Isolation",
        "options": [
          "Isolation",
          "Compression",
          "Indexing",
          "Normalisation"
        ],
        "explanation": "Isolation prevents concurrent transaction effects from producing inappropriate intermediate or conflicting results.",
        "skill": "ACID, record locking and redundancy"
      },
      {
        "id": "13-transactions-4",
        "prompt": "A committed booking survives a later power failure. Which ACID property is illustrated?",
        "answer": "Durability",
        "options": [
          "Durability",
          "Atomicity only",
          "Isolation only",
          "Volatility"
        ],
        "explanation": "Durability requires committed changes to persist, using appropriate persistent storage and recovery mechanisms.",
        "skill": "ACID, record locking and redundancy"
      },
      {
        "id": "13-transactions-5",
        "prompt": "Two clerks try to sell the last seat simultaneously. What can a suitable record lock help prevent?",
        "answer": "Conflicting updates",
        "options": [
          "Conflicting updates",
          "Every possible network outage",
          "All need for validation",
          "Loss of the seat’s primary key"
        ],
        "explanation": "A lock can make competing transactions wait rather than both modifying the seat record at once.",
        "skill": "ACID, record locking and redundancy"
      },
      {
        "id": "13-transactions-6",
        "prompt": "What happens to a failed transaction’s incomplete changes when it rolls back?",
        "answer": "They are undone",
        "options": [
          "They are undone",
          "They must all be committed",
          "The table schema is erased",
          "Every other transaction is deleted"
        ],
        "explanation": "Rollback restores the effects of that transaction rather than leaving its incomplete updates.",
        "skill": "ACID, record locking and redundancy"
      },
      {
        "id": "13-transactions-7",
        "prompt": "Why can excessive locking reduce system responsiveness?",
        "answer": "Other transactions may have to wait",
        "options": [
          "Other transactions may have to wait",
          "Records stop having keys",
          "All indexes disappear",
          "Every request becomes a backup"
        ],
        "explanation": "Locks coordinate access but can block concurrent work, reducing throughput or increasing waiting time.",
        "skill": "ACID, record locking and redundancy"
      },
      {
        "id": "13-transactions-8",
        "prompt": "Two transactions each wait for a lock held by the other. What is this called?",
        "answer": "Deadlock",
        "options": [
          "Deadlock",
          "A hash digest",
          "A successful commit",
          "A cache hit"
        ],
        "explanation": "Neither can proceed until the circular wait is resolved, for example by aborting one transaction.",
        "skill": "ACID, record locking and redundancy"
      },
      {
        "id": "13-transactions-9",
        "prompt": "How can controlled redundant copies support database availability?",
        "answer": "Provide an alternative after failure",
        "options": [
          "Provide an alternative after failure",
          "Guarantee no updates are required",
          "Remove all consistency problems",
          "Replace every backup policy"
        ],
        "explanation": "Replicated copies can keep a service available if one copy fails, but copies must be coordinated.",
        "skill": "ACID, record locking and redundancy"
      },
      {
        "id": "13-transactions-10",
        "prompt": "How does unnecessary duplicated customer data differ from planned replication?",
        "answer": "It risks inconsistent repeated facts",
        "options": [
          "It risks inconsistent repeated facts",
          "It always improves normalisation",
          "It requires no maintenance",
          "It automatically satisfies ACID"
        ],
        "explanation": "Uncontrolled duplication produces anomalies; planned redundant copies have a managed purpose and synchronisation strategy.",
        "skill": "ACID, record locking and redundancy"
      }
    ]
  },
  {
    "id": "13-protocols",
    "section": "1.3",
    "spec": "1.3.3(a,b)",
    "title": "Networks, protocols and standards",
    "lessons": [
      142
    ],
    "page": 110,
    "questions": [
      {
        "id": "13-protocols-1",
        "prompt": "What is a network protocol?",
        "answer": "Agreed rules for communication",
        "options": [
          "Agreed rules for communication",
          "A single physical cable",
          "A secret encryption key",
          "A stored web page"
        ],
        "explanation": "Protocols define how communicating devices format, send, receive and interpret data.",
        "skill": "Networks, protocols and standards"
      },
      {
        "id": "13-protocols-2",
        "prompt": "Why are common network standards valuable?",
        "answer": "Interoperability between systems",
        "options": [
          "Interoperability between systems",
          "Identical hardware is mandatory",
          "Every device gets the same IP",
          "All security threats disappear"
        ],
        "explanation": "Standards let compatible implementations from different manufacturers communicate.",
        "skill": "Networks, protocols and standards"
      },
      {
        "id": "13-protocols-3",
        "prompt": "What best distinguishes a LAN from a WAN in typical use?",
        "answer": "Its local geographical scope",
        "options": [
          "Its local geographical scope",
          "Its compulsory wireless link",
          "Its lack of any protocol",
          "Its guaranteed lower speed"
        ],
        "explanation": "A LAN usually covers a limited site; WANs connect networks over wider geographical areas.",
        "skill": "Networks, protocols and standards"
      },
      {
        "id": "13-protocols-4",
        "prompt": "A company connects offices in several countries. Which network description best fits the inter-office links?",
        "answer": "WAN",
        "options": [
          "WAN",
          "Single-room LAN",
          "CPU bus",
          "One personal hotspot only"
        ],
        "explanation": "The network spans a large geographical area and connects separate sites.",
        "skill": "Networks, protocols and standards"
      },
      {
        "id": "13-protocols-5",
        "prompt": "Is every LAN wireless?",
        "answer": "No",
        "options": [
          "No",
          "Yes, by definition",
          "Only if it has a server",
          "Only at schools"
        ],
        "explanation": "A LAN may use wired links, wireless links or both.",
        "skill": "Networks, protocols and standards"
      },
      {
        "id": "13-protocols-6",
        "prompt": "What is the internet best described as?",
        "answer": "Interconnected networks",
        "options": [
          "Interconnected networks",
          "One central web server",
          "A single company’s LAN",
          "Only websites using HTML"
        ],
        "explanation": "The internet connects many independently managed networks using shared protocols.",
        "skill": "Networks, protocols and standards"
      },
      {
        "id": "13-protocols-7",
        "prompt": "A sender and receiver disagree on message layout. What is the likely problem?",
        "answer": "They may misinterpret data",
        "options": [
          "They may misinterpret data",
          "The data must become compressed",
          "All packets become private",
          "The receiver gains more memory"
        ],
        "explanation": "A shared protocol is needed so both ends interpret fields, boundaries and message meanings consistently.",
        "skill": "Networks, protocols and standards"
      },
      {
        "id": "13-protocols-8",
        "prompt": "Which is an example of a network protocol?",
        "answer": "HTTP",
        "options": [
          "HTTP",
          "HTML paragraph",
          "CPU register",
          "Binary search"
        ],
        "explanation": "HTTP defines application-level web exchanges; HTML describes page content.",
        "skill": "Networks, protocols and standards"
      },
      {
        "id": "13-protocols-9",
        "prompt": "What advantage can a school LAN provide?",
        "answer": "Shared access to resources",
        "options": [
          "Shared access to resources",
          "Unlimited bandwidth for all users",
          "Automatic immunity to malware",
          "No administration costs"
        ],
        "explanation": "Users can share services such as files and printers, while capacity and administration still need management.",
        "skill": "Networks, protocols and standards"
      },
      {
        "id": "13-protocols-10",
        "prompt": "A WAN link uses fibre. Does this stop it being a WAN?",
        "answer": "No",
        "options": [
          "No",
          "Yes, all WANs are wireless",
          "Yes, fibre is not networking",
          "Only if it is encrypted"
        ],
        "explanation": "LAN and WAN classification concerns network scope and organisation, not one compulsory transmission medium.",
        "skill": "Networks, protocols and standards"
      }
    ]
  },
  {
    "id": "13-stack",
    "section": "1.3",
    "spec": "1.3.3(b)",
    "title": "The TCP/IP stack and layering",
    "lessons": [
      143
    ],
    "page": 111,
    "questions": [
      {
        "id": "13-stack-1",
        "prompt": "In the four-layer TCP/IP model, which layer contains HTTP?",
        "answer": "Application",
        "options": [
          "Application",
          "Transport",
          "Internet",
          "Link"
        ],
        "explanation": "HTTP specifies an application service and is treated as an application-layer protocol.",
        "skill": "The TCP/IP stack and layering"
      },
      {
        "id": "13-stack-2",
        "prompt": "Which layer uses TCP to provide reliable ordered transport?",
        "answer": "Transport",
        "options": [
          "Transport",
          "Application",
          "Internet",
          "Link"
        ],
        "explanation": "TCP belongs to the transport layer and can provide sequencing, acknowledgements and retransmission.",
        "skill": "The TCP/IP stack and layering"
      },
      {
        "id": "13-stack-3",
        "prompt": "Which TCP/IP layer handles IP addressing and routing between networks?",
        "answer": "Internet",
        "options": [
          "Internet",
          "Application",
          "Transport",
          "Link"
        ],
        "explanation": "The internet layer uses IP to address and route packets across interconnected networks.",
        "skill": "The TCP/IP stack and layering"
      },
      {
        "id": "13-stack-4",
        "prompt": "Which layer deals with local frames and access to the transmission medium?",
        "answer": "Link",
        "options": [
          "Link",
          "Application",
          "Transport",
          "Internet"
        ],
        "explanation": "The link or network-access layer handles communication over a particular local network technology.",
        "skill": "The TCP/IP stack and layering"
      },
      {
        "id": "13-stack-5",
        "prompt": "What is encapsulation as data moves down a protocol stack?",
        "answer": "Adding layer-specific control data",
        "options": [
          "Adding layer-specific control data",
          "Removing every header",
          "Encrypting without any key",
          "Deleting the application message"
        ],
        "explanation": "Each layer wraps the higher-layer data with the control information it needs, such as a header.",
        "skill": "The TCP/IP stack and layering"
      },
      {
        "id": "13-stack-6",
        "prompt": "Why is a layered model useful when replacing a network technology?",
        "answer": "Layers can change independently",
        "options": [
          "Layers can change independently",
          "No protocols are then needed",
          "Every implementation is identical",
          "All failures become impossible"
        ],
        "explanation": "Defined interfaces can let a link technology change without redesigning the application protocol.",
        "skill": "The TCP/IP stack and layering"
      },
      {
        "id": "13-stack-7",
        "prompt": "Which order correctly goes from application to physical network access in the four-layer model?",
        "answer": "Application, transport, internet, link",
        "options": [
          "Application, transport, internet, link",
          "Application, internet, link, transport",
          "Link, transport, internet, application",
          "Transport, application, link, internet"
        ],
        "explanation": "Data is passed down through transport, internet and link responsibilities before transmission.",
        "skill": "The TCP/IP stack and layering"
      },
      {
        "id": "13-stack-8",
        "prompt": "Does IP alone guarantee ordered, reliable delivery?",
        "answer": "No",
        "options": [
          "No",
          "Yes, for every packet",
          "Only if addresses are numeric",
          "Only for large packets"
        ],
        "explanation": "IP is a best-effort delivery service; reliability and ordering can be supplied by a transport protocol such as TCP.",
        "skill": "The TCP/IP stack and layering"
      },
      {
        "id": "13-stack-9",
        "prompt": "What happens to encapsulation at the receiving end?",
        "answer": "Relevant layer information is removed",
        "options": [
          "Relevant layer information is removed",
          "Every header is sent to the user",
          "All layers are permanently combined",
          "The original data must be discarded"
        ],
        "explanation": "As data moves up the receiving stack, each layer interprets and removes its corresponding control information.",
        "skill": "The TCP/IP stack and layering"
      },
      {
        "id": "13-stack-10",
        "prompt": "A developer uses a socket without controlling Ethernet frame details. What principle is illustrated?",
        "answer": "Separation of layer responsibilities",
        "options": [
          "Separation of layer responsibilities",
          "The absence of protocols",
          "Mandatory circuit switching",
          "Removal of all link hardware"
        ],
        "explanation": "Higher-level software can use networking services while lower layers handle local transmission details.",
        "skill": "The TCP/IP stack and layering"
      }
    ]
  },
  {
    "id": "13-dns",
    "section": "1.3",
    "spec": "1.3.3(b)",
    "title": "DNS, addresses and routing",
    "lessons": [
      144
    ],
    "page": 111,
    "questions": [
      {
        "id": "13-dns-1",
        "prompt": "What is a core purpose of DNS?",
        "answer": "Resolve domain names to addresses",
        "options": [
          "Resolve domain names to addresses",
          "Encrypt all web traffic",
          "Allocate CPU registers",
          "Sort database rows"
        ],
        "explanation": "DNS provides records that can map human-readable domain names to network addresses, among other uses.",
        "skill": "DNS, addresses and routing"
      },
      {
        "id": "13-dns-2",
        "prompt": "A DNS answer is already cached and still valid. What can happen?",
        "answer": "Reuse it without a fresh lookup",
        "options": [
          "Reuse it without a fresh lookup",
          "Delete the domain forever",
          "Encrypt every cached packet",
          "Replace the browser with DNS"
        ],
        "explanation": "Caching reduces repeated queries while the cached record remains valid under its time-to-live rules.",
        "skill": "DNS, addresses and routing"
      },
      {
        "id": "13-dns-3",
        "prompt": "Does DNS normally carry the web page contents back to the browser?",
        "answer": "No",
        "options": [
          "No",
          "Yes, the complete HTML always",
          "Only all image pixels",
          "Only encrypted passwords"
        ],
        "explanation": "DNS helps locate a service; the browser retrieves page resources using web protocols separately.",
        "skill": "DNS, addresses and routing"
      },
      {
        "id": "13-dns-4",
        "prompt": "Which address type is used to route packets between IP networks?",
        "answer": "IP address",
        "options": [
          "IP address",
          "HTML class name",
          "CPU opcode",
          "Database row number"
        ],
        "explanation": "Routers use destination IP information and routing tables to choose a next hop.",
        "skill": "DNS, addresses and routing"
      },
      {
        "id": "13-dns-5",
        "prompt": "What is a router’s routing table used for?",
        "answer": "Choosing a packet’s next hop",
        "options": [
          "Choosing a packet’s next hop",
          "Displaying the web page",
          "Storing all DNS names forever",
          "Compiling JavaScript"
        ],
        "explanation": "The routing table associates destination networks with suitable forwarding routes.",
        "skill": "DNS, addresses and routing"
      },
      {
        "id": "13-dns-6",
        "prompt": "What does a DNS record’s time to live help determine?",
        "answer": "How long it may be cached",
        "options": [
          "How long it may be cached",
          "How many images a page has",
          "The CPU clock speed",
          "The page’s ranking score"
        ],
        "explanation": "TTL limits how long cached DNS information can be reused before it should be refreshed.",
        "skill": "DNS, addresses and routing"
      },
      {
        "id": "13-dns-7",
        "prompt": "Why is DNS described as hierarchical?",
        "answer": "Names are organised in levels",
        "options": [
          "Names are organised in levels",
          "Every lookup uses one flat file",
          "All users own a root server",
          "Every domain has one character"
        ],
        "explanation": "Resolution can follow the naming hierarchy through root, top-level and authoritative services, with caching where available.",
        "skill": "DNS, addresses and routing"
      },
      {
        "id": "13-dns-8",
        "prompt": "Can several domain names refer to the same IP address?",
        "answer": "Yes",
        "options": [
          "Yes",
          "No, a strict one-to-one mapping",
          "Only on disconnected computers",
          "Only with no DNS"
        ],
        "explanation": "Multiple hostnames can resolve to one address, and hosting services can distinguish the requested website separately.",
        "skill": "DNS, addresses and routing"
      },
      {
        "id": "13-dns-9",
        "prompt": "A domain’s IP address changes. Why might some users briefly use its old address?",
        "answer": "A cached answer remains valid",
        "options": [
          "A cached answer remains valid",
          "Their keyboard sends wrong letters",
          "DNS always stores pages forever",
          "All routers use domain names only"
        ],
        "explanation": "Previously cached DNS records may remain until their caching period expires.",
        "skill": "DNS, addresses and routing"
      },
      {
        "id": "13-dns-10",
        "prompt": "Which action normally follows obtaining a site’s address?",
        "answer": "Connect to the web service",
        "options": [
          "Connect to the web service",
          "Turn the address into source code",
          "Delete the DNS hierarchy",
          "Ask DNS to render the page"
        ],
        "explanation": "The client can attempt a connection to the resolved address; DNS resolution itself is not the web session.",
        "skill": "DNS, addresses and routing"
      }
    ]
  },
  {
    "id": "13-switching",
    "section": "1.3",
    "spec": "1.3.3(b)",
    "title": "Packet and circuit switching",
    "lessons": [
      145
    ],
    "page": 112,
    "questions": [
      {
        "id": "13-switching-1",
        "prompt": "How does packet switching send a large message?",
        "answer": "Split it into addressed packets",
        "options": [
          "Split it into addressed packets",
          "Reserve one permanent cable per user",
          "Remove all destination information",
          "Use no shared links"
        ],
        "explanation": "Packets carry control information so they can be forwarded across shared network infrastructure.",
        "skill": "Packet and circuit switching"
      },
      {
        "id": "13-switching-2",
        "prompt": "What is reserved in a circuit-switched connection?",
        "answer": "An end-to-end circuit’s capacity",
        "options": [
          "An end-to-end circuit’s capacity",
          "A database primary key",
          "A DNS cache entry",
          "An HTML page template"
        ],
        "explanation": "Circuit switching establishes a dedicated communication path or reserved capacity for the session.",
        "skill": "Packet and circuit switching"
      },
      {
        "id": "13-switching-3",
        "prompt": "Why is packet switching efficient for bursty internet traffic?",
        "answer": "Users can share link capacity",
        "options": [
          "Users can share link capacity",
          "Every user needs a reserved circuit",
          "Packets contain no overhead",
          "All traffic has identical timing"
        ],
        "explanation": "Capacity can be used by different transmissions as packets become ready instead of sitting reserved during silence.",
        "skill": "Packet and circuit switching"
      },
      {
        "id": "13-switching-4",
        "prompt": "Why might packet sequence information be needed?",
        "answer": "To restore the intended order",
        "options": [
          "To restore the intended order",
          "To change the original message",
          "To replace destination addresses",
          "To prove sender identity alone"
        ],
        "explanation": "Packets can arrive out of order, so sequencing lets a suitable protocol reconstruct the data stream correctly.",
        "skill": "Packet and circuit switching"
      },
      {
        "id": "13-switching-5",
        "prompt": "Must all packets from one message follow different routes?",
        "answer": "No",
        "options": [
          "No",
          "Yes, always",
          "Only over a LAN",
          "Only with encryption"
        ],
        "explanation": "Routes may be the same or different depending on routing decisions and network conditions.",
        "skill": "Packet and circuit switching"
      },
      {
        "id": "13-switching-6",
        "prompt": "What can happen when a packet-switched link is congested?",
        "answer": "Queuing and packet loss",
        "options": [
          "Queuing and packet loss",
          "Guaranteed zero delay",
          "Automatic extra physical cables",
          "All addresses become identical"
        ],
        "explanation": "Limited capacity and buffers can cause packets to wait or be dropped during congestion.",
        "skill": "Packet and circuit switching"
      },
      {
        "id": "13-switching-7",
        "prompt": "Which is an overhead of splitting data into packets?",
        "answer": "Control data in packet headers",
        "options": [
          "Control data in packet headers",
          "No need for routing",
          "Loss of every payload byte",
          "A dedicated circuit always"
        ],
        "explanation": "Each packet carries information such as addressing, which consumes part of the transmitted capacity.",
        "skill": "Packet and circuit switching"
      },
      {
        "id": "13-switching-8",
        "prompt": "What is a disadvantage of circuit switching during long silent periods?",
        "answer": "Reserved capacity may be unused",
        "options": [
          "Reserved capacity may be unused",
          "The circuit automatically compresses",
          "No connection is established",
          "Other traffic uses it freely always"
        ],
        "explanation": "Capacity reserved for the circuit may sit idle while the participants send nothing.",
        "skill": "Packet and circuit switching"
      },
      {
        "id": "13-switching-9",
        "prompt": "A router fails. Why may a packet-switched network continue carrying traffic?",
        "answer": "Alternative routes may exist",
        "options": [
          "Alternative routes may exist",
          "Packets never use routers",
          "All lost packets become circuits",
          "Every route is guaranteed identical"
        ],
        "explanation": "If the topology and routing provide another route, later packets can be forwarded around a failure.",
        "skill": "Packet and circuit switching"
      },
      {
        "id": "13-switching-10",
        "prompt": "Does packet switching itself guarantee that a complete message arrives?",
        "answer": "No",
        "options": [
          "No",
          "Yes, regardless of failures",
          "Only if packets are small",
          "Only for text messages"
        ],
        "explanation": "Reliable delivery requires additional mechanisms and sufficient network availability; packet forwarding alone is not a guarantee.",
        "skill": "Packet and circuit switching"
      }
    ]
  },
  {
    "id": "13-security",
    "section": "1.3",
    "spec": "1.3.3(c)",
    "title": "Network threats and defences",
    "lessons": [
      146,
      147
    ],
    "page": 112,
    "questions": [
      {
        "id": "13-security-1",
        "prompt": "What does a firewall primarily do?",
        "answer": "Filter network traffic using rules",
        "options": [
          "Filter network traffic using rules",
          "Guarantee no malware can run",
          "Replace all encryption",
          "Correct database normalisation"
        ],
        "explanation": "A firewall permits or blocks traffic according to configured rules, reducing unwanted network access.",
        "skill": "Network threats and defences"
      },
      {
        "id": "13-security-2",
        "prompt": "What is a proxy server’s role in a web request?",
        "answer": "Act as an intermediary",
        "options": [
          "Act as an intermediary",
          "Always provide the final website",
          "Replace every network cable",
          "Store every user’s private key"
        ],
        "explanation": "A proxy can forward requests on a client’s behalf and may apply filtering, caching or logging.",
        "skill": "Network threats and defences"
      },
      {
        "id": "13-security-3",
        "prompt": "Why can HTTPS help on an untrusted wireless network?",
        "answer": "Encrypt data in transit",
        "options": [
          "Encrypt data in transit",
          "Hide every possible metadata field",
          "Guarantee the endpoint is safe",
          "Remove all need for passwords"
        ],
        "explanation": "TLS protects web traffic in transit, though compromised endpoints and application flaws still pose risks.",
        "skill": "Network threats and defences"
      },
      {
        "id": "13-security-4",
        "prompt": "A fake email persuades a user to enter a password on a copied login page. What is this?",
        "answer": "Phishing",
        "options": [
          "Phishing",
          "Packet sequencing",
          "Normalisation",
          "Lossless compression"
        ],
        "explanation": "Phishing uses deception to obtain sensitive information or prompt harmful actions.",
        "skill": "Network threats and defences"
      },
      {
        "id": "13-security-5",
        "prompt": "Many compromised devices overwhelm a service with traffic. What attack is this?",
        "answer": "Distributed denial of service",
        "options": [
          "Distributed denial of service",
          "A primary-key conflict",
          "A DNS cache hit",
          "A normal index update"
        ],
        "explanation": "A DDoS attack uses multiple sources to exhaust resources and disrupt availability.",
        "skill": "Network threats and defences"
      },
      {
        "id": "13-security-6",
        "prompt": "Why is an allowed port through a firewall not proof that traffic is harmless?",
        "answer": "Malicious content can use allowed traffic",
        "options": [
          "Malicious content can use allowed traffic",
          "Firewalls cannot inspect any field",
          "All allowed traffic is plaintext",
          "Ports uniquely identify trustworthy users"
        ],
        "explanation": "Rules can reduce exposure, but permitted services can still carry attacks or harmful data.",
        "skill": "Network threats and defences"
      },
      {
        "id": "13-security-7",
        "prompt": "How can a caching proxy reduce repeated external downloads?",
        "answer": "Serve a valid stored copy",
        "options": [
          "Serve a valid stored copy",
          "Reserve a circuit for every user",
          "Remove all HTML from the network",
          "Guarantee the source is truthful"
        ],
        "explanation": "A reusable cached response can satisfy requests without fetching the same resource again from the origin.",
        "skill": "Network threats and defences"
      },
      {
        "id": "13-security-8",
        "prompt": "What threat does packet sniffing create for unencrypted sensitive traffic?",
        "answer": "An observer may read contents",
        "options": [
          "An observer may read contents",
          "Every packet is automatically changed",
          "The receiver must lose all data",
          "The sender gains bandwidth"
        ],
        "explanation": "Captured plaintext traffic can disclose information; suitable transport encryption reduces this risk.",
        "skill": "Network threats and defences"
      },
      {
        "id": "13-security-9",
        "prompt": "Why combine patching, access control, encryption and filtering?",
        "answer": "They address different attack paths",
        "options": [
          "They address different attack paths",
          "One makes every other defence useless",
          "They guarantee absolute security",
          "They remove the need for backups"
        ],
        "explanation": "Layered controls cover different weaknesses and reduce dependence on any single defence.",
        "skill": "Network threats and defences"
      },
      {
        "id": "13-security-10",
        "prompt": "What does ransomware typically threaten?",
        "answer": "Encrypting or denying access to data",
        "options": [
          "Encrypting or denying access to data",
          "Making all file copies smaller",
          "Improving DNS resolution",
          "Removing only duplicate rows"
        ],
        "explanation": "Ransomware commonly makes data or systems unavailable and demands payment; recovery needs planned safeguards.",
        "skill": "Network threats and defences"
      }
    ]
  },
  {
    "id": "13-hardware",
    "section": "1.3",
    "spec": "1.3.3(d)",
    "title": "Network hardware",
    "lessons": [
      148
    ],
    "page": 110,
    "questions": [
      {
        "id": "13-hardware-1",
        "prompt": "Which device forwards frames to appropriate ports using learned MAC addresses?",
        "answer": "Switch",
        "options": [
          "Switch",
          "Hub",
          "Modem only",
          "CPU register"
        ],
        "explanation": "A switch learns local MAC-to-port associations and uses them for forwarding, flooding where appropriate.",
        "skill": "Network hardware"
      },
      {
        "id": "13-hardware-2",
        "prompt": "What does a simple hub normally do with received signals?",
        "answer": "Repeat them to other ports",
        "options": [
          "Repeat them to other ports",
          "Route by destination IP",
          "Filter by user permissions",
          "Resolve domain names"
        ],
        "explanation": "A basic hub repeats traffic rather than selectively forwarding frames like a switch.",
        "skill": "Network hardware"
      },
      {
        "id": "13-hardware-3",
        "prompt": "Which device connects different IP networks and forwards packets between them?",
        "answer": "Router",
        "options": [
          "Router",
          "Keyboard",
          "Passive hub",
          "Database index"
        ],
        "explanation": "A router uses IP routing information to forward packets between networks.",
        "skill": "Network hardware"
      },
      {
        "id": "13-hardware-4",
        "prompt": "What is a wireless access point used for?",
        "answer": "Connect wireless devices to a LAN",
        "options": [
          "Connect wireless devices to a LAN",
          "Replace every internet router",
          "Compress all radio messages",
          "Store user passwords by definition"
        ],
        "explanation": "An access point provides wireless network access, commonly bridging wireless devices into a wired LAN.",
        "skill": "Network hardware"
      },
      {
        "id": "13-hardware-5",
        "prompt": "What is a network interface card or adapter for?",
        "answer": "Providing a device’s network interface",
        "options": [
          "Providing a device’s network interface",
          "Choosing all web-page colours",
          "Holding the full internet index",
          "Encrypting every stored file"
        ],
        "explanation": "A NIC provides the hardware interface used by a computer to send and receive network data.",
        "skill": "Network hardware"
      },
      {
        "id": "13-hardware-6",
        "prompt": "A connection needs signal conversion for its communication service. Which device commonly performs modulation and demodulation?",
        "answer": "Modem",
        "options": [
          "Modem",
          "Switch only",
          "HTML renderer",
          "DNS cache"
        ],
        "explanation": "A modem adapts signals for an appropriate communications link; its exact role depends on the access technology.",
        "skill": "Network hardware"
      },
      {
        "id": "13-hardware-7",
        "prompt": "Which hardware would normally connect several wired computers within one LAN efficiently?",
        "answer": "Switch",
        "options": [
          "Switch",
          "Only a public DNS server",
          "One CPU per cable",
          "A printer’s paper tray"
        ],
        "explanation": "A switch connects local Ethernet devices and forwards traffic between its ports.",
        "skill": "Network hardware"
      },
      {
        "id": "13-hardware-8",
        "prompt": "Why might fibre be chosen for a long high-capacity network link?",
        "answer": "High capacity over long distances",
        "options": [
          "High capacity over long distances",
          "It requires no endpoints",
          "It never needs installation work",
          "It carries electricity to every laptop"
        ],
        "explanation": "Optical fibre supports high data rates and long distances, though suitable equipment and installation are needed.",
        "skill": "Network hardware"
      },
      {
        "id": "13-hardware-9",
        "prompt": "A home box combines routing, wireless access and switching. How should its functions be understood?",
        "answer": "Several roles in one device",
        "options": [
          "Several roles in one device",
          "All network devices are identical",
          "It performs DNS for the whole world",
          "It eliminates network protocols"
        ],
        "explanation": "Physical products can combine functions that are taught as separate network-hardware roles.",
        "skill": "Network hardware"
      },
      {
        "id": "13-hardware-10",
        "prompt": "A wireless laptop reaches a wired school server. Which component typically provides its local wireless connection?",
        "answer": "Wireless access point",
        "options": [
          "Wireless access point",
          "SQL primary key",
          "Graphics card",
          "Public-key certificate"
        ],
        "explanation": "The access point connects the wireless client to the LAN containing or reaching the server.",
        "skill": "Network hardware"
      }
    ]
  },
  {
    "id": "13-models",
    "section": "1.3",
    "spec": "1.3.3(e)",
    "title": "Client–server and peer-to-peer networks",
    "lessons": [
      149
    ],
    "page": 116,
    "questions": [
      {
        "id": "13-models-1",
        "prompt": "In a client–server model, what does the client normally do?",
        "answer": "Request a service",
        "options": [
          "Request a service",
          "Always hold every account database",
          "Never process any data",
          "Replace all network hardware"
        ],
        "explanation": "The client requests resources or services provided by a server and may also perform local processing.",
        "skill": "Client–server and peer-to-peer networks"
      },
      {
        "id": "13-models-2",
        "prompt": "What characterises a peer-to-peer model?",
        "answer": "Peers can request and provide resources",
        "options": [
          "Peers can request and provide resources",
          "A dedicated server is compulsory",
          "No device can share files",
          "Every peer has identical files"
        ],
        "explanation": "Peers can act as both consumers and providers rather than relying solely on a dedicated central server.",
        "skill": "Client–server and peer-to-peer networks"
      },
      {
        "id": "13-models-3",
        "prompt": "Why might a school choose client–server accounts?",
        "answer": "Central administration of permissions",
        "options": [
          "Central administration of permissions",
          "No server maintenance costs",
          "Guaranteed immunity to outages",
          "No need for network links"
        ],
        "explanation": "Centrally managed accounts and access policies can make administration more consistent.",
        "skill": "Client–server and peer-to-peer networks"
      },
      {
        "id": "13-models-4",
        "prompt": "What is a risk of relying on one central server without redundancy?",
        "answer": "A server failure disrupts services",
        "options": [
          "A server failure disrupts services",
          "Clients can no longer have CPUs",
          "All data becomes public automatically",
          "Every packet loses its header"
        ],
        "explanation": "The central service can be a failure point unless backup, redundancy and recovery measures are designed.",
        "skill": "Client–server and peer-to-peer networks"
      },
      {
        "id": "13-models-5",
        "prompt": "Why can peer-to-peer suit a small temporary file-sharing group?",
        "answer": "Low initial dedicated-server cost",
        "options": [
          "Low initial dedicated-server cost",
          "Automatic central backups",
          "No security decisions are needed",
          "Guaranteed unlimited scalability"
        ],
        "explanation": "It can avoid buying and administering a dedicated server, although managing peers still takes effort.",
        "skill": "Client–server and peer-to-peer networks"
      },
      {
        "id": "13-models-6",
        "prompt": "What is a management difficulty in a peer-to-peer network?",
        "answer": "Resources and permissions are dispersed",
        "options": [
          "Resources and permissions are dispersed",
          "All files have one central owner always",
          "No computer can provide resources",
          "Each peer is a compulsory backup"
        ],
        "explanation": "Accounts, permissions and data may be spread across peers, making consistent control harder.",
        "skill": "Client–server and peer-to-peer networks"
      },
      {
        "id": "13-models-7",
        "prompt": "A file is shared only from one peer’s laptop. What happens if that laptop is offline?",
        "answer": "The file may be unavailable",
        "options": [
          "The file may be unavailable",
          "All peers automatically keep a copy",
          "The internet reconstructs it",
          "The file becomes a server"
        ],
        "explanation": "Peer-to-peer does not itself guarantee replication; availability depends on where the resource is stored.",
        "skill": "Client–server and peer-to-peer networks"
      },
      {
        "id": "13-models-8",
        "prompt": "Can a server be a software role rather than a separate physical box?",
        "answer": "Yes",
        "options": [
          "Yes",
          "No, always a unique machine",
          "Only on a WAN",
          "Only without an OS"
        ],
        "explanation": "Client and server describe roles; several services can run on one computer or in virtual environments.",
        "skill": "Client–server and peer-to-peer networks"
      },
      {
        "id": "13-models-9",
        "prompt": "Which arrangement makes centrally scheduled backups easier?",
        "answer": "Client–server with central storage",
        "options": [
          "Client–server with central storage",
          "Unmanaged local-only files everywhere",
          "A peer network without any shared policy",
          "A disconnected printer"
        ],
        "explanation": "Central storage provides a defined location to protect, though the backup still needs configuration and testing.",
        "skill": "Client–server and peer-to-peer networks"
      },
      {
        "id": "13-models-10",
        "prompt": "Does peer-to-peer mean every device must have identical permissions and capacity?",
        "answer": "No",
        "options": [
          "No",
          "Yes, by definition",
          "Only if it uses Ethernet",
          "Only if it has three peers"
        ],
        "explanation": "Peer roles do not require identical hardware, permissions or amounts of shared data.",
        "skill": "Client–server and peer-to-peer networks"
      }
    ]
  },
  {
    "id": "13-html",
    "section": "1.3",
    "spec": "1.3.4(a)",
    "title": "HTML structure, links and forms",
    "lessons": [
      150,
      153
    ],
    "page": 122,
    "questions": [
      {
        "id": "13-html-1",
        "prompt": "Which part of this HTML is the link destination?",
        "answer": "guide.html",
        "options": [
          "guide.html",
          "Read guide",
          "a",
          "href only"
        ],
        "explanation": "The href attribute gives the destination, while Read guide is the link’s displayed text.",
        "skill": "HTML structure, links and forms",
        "code": "<a href=\"guide.html\">\n  Read guide\n</a>",
        "language": "HTML"
      },
      {
        "id": "13-html-2",
        "prompt": "What does the title element normally set?",
        "answer": "The browser tab’s page title",
        "options": [
          "The browser tab’s page title",
          "The largest visible body heading",
          "The background colour",
          "The server’s IP address"
        ],
        "explanation": "The title element in the head supplies document title information used by the browser, distinct from a body heading.",
        "skill": "HTML structure, links and forms"
      },
      {
        "id": "13-html-3",
        "prompt": "Which tag represents an item in an HTML list?",
        "answer": "<li>",
        "options": [
          "<li>",
          "<ul>",
          "<body>",
          "<title>"
        ],
        "explanation": "An li element is a list item inside an ordered or unordered list.",
        "skill": "HTML structure, links and forms"
      },
      {
        "id": "13-html-4",
        "prompt": "Which tag normally places an image into a page?",
        "answer": "<img>",
        "options": [
          "<img>",
          "<a>",
          "<p>",
          "<ol>"
        ],
        "explanation": "The img element embeds an image whose location is specified using src.",
        "skill": "HTML structure, links and forms"
      },
      {
        "id": "13-html-5",
        "prompt": "Which attribute identifies the image file to load?",
        "answer": "src",
        "options": [
          "src",
          "href",
          "class",
          "method"
        ],
        "explanation": "The src attribute supplies the image resource address; alt supplies alternative text.",
        "skill": "HTML structure, links and forms",
        "code": "<img src=\"cpu.png\"\n     alt=\"CPU components\">",
        "language": "HTML"
      },
      {
        "id": "13-html-6",
        "prompt": "In this form, which label–input connection is correct?",
        "answer": "for matches id",
        "options": [
          "for matches id",
          "for matches type",
          "name matches action",
          "method matches id"
        ],
        "explanation": "A label’s for value matches an input’s id, connecting the label with that form control.",
        "skill": "HTML structure, links and forms",
        "code": "<label for=\"year\">Year</label>\n<input id=\"year\" name=\"year\"\n       type=\"number\">",
        "language": "HTML"
      },
      {
        "id": "13-html-7",
        "prompt": "What is the role of the body element?",
        "answer": "Contain page content",
        "options": [
          "Contain page content",
          "Store only the tab title",
          "Define all IP addresses",
          "Run every database query"
        ],
        "explanation": "The body contains the document content that the browser presents to the user.",
        "skill": "HTML structure, links and forms"
      },
      {
        "id": "13-html-8",
        "prompt": "Which tag creates an unordered list container?",
        "answer": "<ul>",
        "options": [
          "<ul>",
          "<ol>",
          "<li>",
          "<br>"
        ],
        "explanation": "A ul groups unordered list items; ol is for an ordered list and li is an individual item.",
        "skill": "HTML structure, links and forms"
      },
      {
        "id": "13-html-9",
        "prompt": "Why provide useful alt text for an informative image?",
        "answer": "Convey its meaning without the image",
        "options": [
          "Convey its meaning without the image",
          "Guarantee faster broadband",
          "Encrypt the image pixels",
          "Set its CSS border"
        ],
        "explanation": "Alternative text helps when the image cannot be seen, including for screen-reader users.",
        "skill": "HTML structure, links and forms"
      },
      {
        "id": "13-html-10",
        "prompt": "What does a form’s action attribute specify?",
        "answer": "Where form data is submitted",
        "options": [
          "Where form data is submitted",
          "The input’s text colour",
          "The compulsory number of fields",
          "The page’s primary key"
        ],
        "explanation": "The action gives the destination endpoint used when the form is submitted.",
        "skill": "HTML structure, links and forms"
      }
    ]
  },
  {
    "id": "13-css",
    "section": "1.3",
    "spec": "1.3.4(a)",
    "title": "CSS selectors and presentation",
    "lessons": [
      151
    ],
    "page": 123,
    "questions": [
      {
        "id": "13-css-1",
        "prompt": "Which elements does .notice select in CSS?",
        "answer": "Elements with class notice",
        "options": [
          "Elements with class notice",
          "Only the first paragraph",
          "Elements with ID notice",
          "Every linked page"
        ],
        "explanation": "A dot introduces a class selector; all elements with that class can match it.",
        "skill": "CSS selectors and presentation"
      },
      {
        "id": "13-css-2",
        "prompt": "Which element does #status target?",
        "answer": "The element with ID status",
        "options": [
          "The element with ID status",
          "Every element with class status",
          "Every paragraph",
          "The entire server"
        ],
        "explanation": "The hash symbol introduces an ID selector.",
        "skill": "CSS selectors and presentation"
      },
      {
        "id": "13-css-3",
        "prompt": "With these ordinary rules and no other styles, what colour is the paragraph’s text?",
        "answer": "Green",
        "options": [
          "Green",
          "Blue",
          "Black",
          "Red"
        ],
        "explanation": "The ID selector has higher specificity than the class and element selectors shown.",
        "skill": "CSS selectors and presentation",
        "code": "<p id=\"flag\" class=\"notice\">Ready</p>\np { color: black; }\n.notice { color: blue; }\n#flag { color: green; }",
        "language": "HTML / CSS"
      },
      {
        "id": "13-css-4",
        "prompt": "Which CSS property changes text colour?",
        "answer": "color",
        "options": [
          "color",
          "background-color",
          "font-size",
          "border-width"
        ],
        "explanation": "The color property sets the foreground text colour; background-color controls the background.",
        "skill": "CSS selectors and presentation"
      },
      {
        "id": "13-css-5",
        "prompt": "Which CSS property changes the size of text?",
        "answer": "font-size",
        "options": [
          "font-size",
          "text-align",
          "margin",
          "src"
        ],
        "explanation": "The font-size property sets the size of the type used to render text.",
        "skill": "CSS selectors and presentation"
      },
      {
        "id": "13-css-6",
        "prompt": "With equal specificity and no other differences, which rule wins here?",
        "answer": "The later blue rule",
        "options": [
          "The later blue rule",
          "The earlier red rule",
          "Both colours alternate",
          "Neither rule applies"
        ],
        "explanation": "When these equal-priority rules compete for the same property, later source order breaks the tie.",
        "skill": "CSS selectors and presentation",
        "code": "p { color: red; }\np { color: blue; }",
        "language": "HTML / CSS"
      },
      {
        "id": "13-css-7",
        "prompt": "What does padding measure in the CSS box model?",
        "answer": "Space inside the border",
        "options": [
          "Space inside the border",
          "Space outside the margin",
          "The server’s free memory",
          "Only the text’s width"
        ],
        "explanation": "Padding separates content from its border; margin lies outside the border.",
        "skill": "CSS selectors and presentation"
      },
      {
        "id": "13-css-8",
        "prompt": "What is an advantage of a shared external stylesheet?",
        "answer": "Consistent styling across pages",
        "options": [
          "Consistent styling across pages",
          "All pages become one HTML file",
          "Server checks are unnecessary",
          "Every image becomes smaller"
        ],
        "explanation": "Several pages can use one stylesheet, making shared appearance easier to maintain.",
        "skill": "CSS selectors and presentation"
      },
      {
        "id": "13-css-9",
        "prompt": "What does p { text-align: center; } affect?",
        "answer": "Text alignment in paragraphs",
        "options": [
          "Text alignment in paragraphs",
          "The number of paragraphs",
          "The server’s location",
          "Every image file’s encoding"
        ],
        "explanation": "The p selector targets paragraphs, and text-align controls their inline content alignment.",
        "skill": "CSS selectors and presentation"
      },
      {
        "id": "13-css-10",
        "prompt": "What is the main role of CSS compared with HTML?",
        "answer": "Control presentation",
        "options": [
          "Control presentation",
          "Store database transactions",
          "Route network packets",
          "Define public-key pairs"
        ],
        "explanation": "CSS controls visual presentation such as colour, spacing and typography; HTML supplies document structure.",
        "skill": "CSS selectors and presentation"
      }
    ]
  },
  {
    "id": "13-css-appendix",
    "section": "1.3",
    "spec": "1.3.4(a)",
    "title": "OCR Appendix 5d: CSS properties",
    "lessons": [
      151
    ],
    "page": 123,
    "questions": [
      {
        "id": "13-css-appendix-1",
        "prompt": "Which OCR-listed CSS property sets an element's background colour?",
        "answer": "background-color",
        "options": [
          "background-color",
          "color",
          "border-color",
          "font-family"
        ],
        "explanation": "background-color fills the background; color sets foreground text colour.",
        "skill": "OCR Appendix 5d: CSS properties",
        "source": "Final H446 Paper 1, OCR Appendix 5d CSS cycle (pages 365–368)"
      },
      {
        "id": "13-css-appendix-2",
        "prompt": "Which CSS property sets the colour of an element's border?",
        "answer": "border-color",
        "options": [
          "border-color",
          "background-color",
          "border-style",
          "color"
        ],
        "explanation": "border-color changes the border's colour, not its thickness or style.",
        "skill": "OCR Appendix 5d: CSS properties",
        "source": "Final H446 Paper 1, OCR Appendix 5d CSS cycle (pages 365–368)"
      },
      {
        "id": "13-css-appendix-3",
        "prompt": "Which CSS property chooses whether a border is solid, dashed or dotted?",
        "answer": "border-style",
        "options": [
          "border-style",
          "border-width",
          "border-color",
          "font-family"
        ],
        "explanation": "border-style selects the border line pattern.",
        "skill": "OCR Appendix 5d: CSS properties",
        "source": "Final H446 Paper 1, OCR Appendix 5d CSS cycle (pages 365–368)"
      },
      {
        "id": "13-css-appendix-4",
        "prompt": "Which CSS property specifies the thickness of a border?",
        "answer": "border-width",
        "options": [
          "border-width",
          "border-style",
          "width",
          "height"
        ],
        "explanation": "border-width controls the border thickness; width controls the element's content width.",
        "skill": "OCR Appendix 5d: CSS properties",
        "source": "Final H446 Paper 1, OCR Appendix 5d CSS cycle (pages 365–368)"
      },
      {
        "id": "13-css-appendix-5",
        "prompt": "Which OCR-listed property specifies the typeface?",
        "answer": "font-family",
        "options": [
          "font-family",
          "font-size",
          "color",
          "border-style"
        ],
        "explanation": "font-family selects fonts such as Arial and serif fallbacks.",
        "skill": "OCR Appendix 5d: CSS properties",
        "source": "Final H446 Paper 1, OCR Appendix 5d CSS cycle (pages 365–368)"
      },
      {
        "id": "13-css-appendix-6",
        "prompt": "Which property sets the element's width to 300 pixels?",
        "answer": "width",
        "options": [
          "width",
          "height",
          "border-width",
          "font-size"
        ],
        "explanation": "width: 300px controls the horizontal dimension.",
        "skill": "OCR Appendix 5d: CSS properties",
        "source": "Final H446 Paper 1, OCR Appendix 5d CSS cycle (pages 365–368)"
      },
      {
        "id": "13-css-appendix-7",
        "prompt": "Which property sets the element's height to 40 pixels?",
        "answer": "height",
        "options": [
          "height",
          "width",
          "font-size",
          "border-width"
        ],
        "explanation": "height: 40px controls the vertical dimension.",
        "skill": "OCR Appendix 5d: CSS properties",
        "source": "Final H446 Paper 1, OCR Appendix 5d CSS cycle (pages 365–368)"
      },
      {
        "id": "13-css-appendix-8",
        "prompt": "What colours does this CSS give the paragraph's text and background?",
        "answer": "Blue text on a yellow background",
        "options": [
          "Blue text on a yellow background",
          "Yellow text on a blue background",
          "Blue text on a blue background",
          "Yellow text on a yellow background"
        ],
        "explanation": "color sets text to blue; background-color sets the background to yellow.",
        "skill": "OCR Appendix 5d: CSS properties",
        "source": "Final H446 Paper 1, OCR Appendix 5d CSS cycle (pages 365–368)",
        "code": "p { color: blue; background-color: yellow; }"
      },
      {
        "id": "13-css-appendix-9",
        "prompt": "Which element is styled by the ID selector in the CSS?",
        "answer": "The heading whose id is menu",
        "options": [
          "The heading whose id is menu",
          "Every paragraph with class notice",
          "Every heading on the page",
          "Every element with class menu"
        ],
        "explanation": "#menu selects the single element with id=\"menu\".",
        "skill": "OCR Appendix 5d: CSS properties",
        "source": "Final H446 Paper 1, OCR Appendix 5d CSS cycle (pages 365–368)",
        "code": "<h1 id=\"menu\">Notice</h1>\n<p class=\"notice\">Hello</p>\n#menu { color: red; }"
      },
      {
        "id": "13-css-appendix-10",
        "prompt": "The same paragraph has an external class rule and an inline style declaration for color. Which text colour is used?",
        "answer": "Blue, from the inline declaration",
        "options": [
          "Blue, from the inline declaration",
          "Red, from the external class rule",
          "Black, the browser default",
          "Green, from the border declaration"
        ],
        "explanation": "A normal inline declaration has higher precedence than a normal external class rule.",
        "skill": "OCR Appendix 5d: CSS properties",
        "source": "Final H446 Paper 1, OCR Appendix 5d CSS cycle (pages 365–368)",
        "code": "/* external stylesheet */\n.notice { color: red; }\n/* HTML */\n<p class=\"notice\" style=\"color: blue;\">Alert</p>"
      }
    ]
  },
  {
    "id": "13-javascript",
    "section": "1.3",
    "spec": "1.3.4(a)",
    "title": "JavaScript and page behaviour",
    "lessons": [
      152
    ],
    "page": 123,
    "questions": [
      {
        "id": "13-javascript-1",
        "prompt": "What value is passed to document.write by this code?",
        "answer": "7",
        "options": [
          "7",
          "43",
          "12",
          "1"
        ],
        "explanation": "Both operands are numbers, so adding 4 and 3 gives 7.",
        "skill": "JavaScript and page behaviour",
        "code": "var x = 4;\nvar y = 3;\ndocument.write(x + y);",
        "language": "JavaScript"
      },
      {
        "id": "13-javascript-2",
        "prompt": "What does document.getElementById(\"score\") locate?",
        "answer": "The element with ID score",
        "options": [
          "The element with ID score",
          "Every element with class score",
          "A database table called score",
          "The server’s numeric score"
        ],
        "explanation": "The method looks up a document element by its id attribute.",
        "skill": "JavaScript and page behaviour"
      },
      {
        "id": "13-javascript-3",
        "prompt": "What is the final value of total after this loop?",
        "answer": "6",
        "options": [
          "6",
          "3",
          "4",
          "10"
        ],
        "explanation": "The loop adds 1, 2 and 3, giving a total of 6 before i becomes 4 and the condition fails.",
        "skill": "JavaScript and page behaviour",
        "code": "var total = 0;\nfor (var i = 1; i <= 3; i++) {\n  total = total + i;\n}",
        "language": "JavaScript"
      },
      {
        "id": "13-javascript-4",
        "prompt": "What text is output by this selection when age is 17?",
        "answer": "Junior",
        "options": [
          "Junior",
          "Adult",
          "17",
          "Nothing"
        ],
        "explanation": "The test age >= 18 is false for 17, so the else branch outputs Junior.",
        "skill": "JavaScript and page behaviour",
        "code": "var age = 17;\nif (age >= 18) {\n  document.write(\"Adult\");\n} else {\n  document.write(\"Junior\");\n}",
        "language": "JavaScript"
      },
      {
        "id": "13-javascript-5",
        "prompt": "What does this assignment do when a matching element exists?",
        "answer": "Replace its displayed text content",
        "options": [
          "Replace its displayed text content",
          "Send its text to every server",
          "Create an SQL table",
          "Change all page IDs"
        ],
        "explanation": "Assigning textContent replaces that element’s text without treating the supplied string as HTML markup.",
        "skill": "JavaScript and page behaviour",
        "code": "document.getElementById(\"status\")\n  .textContent = \"Ready\";",
        "language": "JavaScript"
      },
      {
        "id": "13-javascript-6",
        "prompt": "What does a click event handler specify?",
        "answer": "Code to run when a click occurs",
        "options": [
          "Code to run when a click occurs",
          "A fixed IP address",
          "An HTML heading level",
          "A database primary key"
        ],
        "explanation": "An event handler responds to an event such as a user clicking a button.",
        "skill": "JavaScript and page behaviour"
      },
      {
        "id": "13-javascript-7",
        "prompt": "What value is passed to document.write by double(6)?",
        "answer": "12",
        "options": [
          "12",
          "6",
          "8",
          "36"
        ],
        "explanation": "The function returns its parameter multiplied by two, so double(6) returns 12.",
        "skill": "JavaScript and page behaviour",
        "code": "function double(n) {\n  return n * 2;\n}\ndocument.write(double(6));",
        "language": "JavaScript"
      },
      {
        "id": "13-javascript-8",
        "prompt": "What is the final value of x after this while loop?",
        "answer": "8",
        "options": [
          "8",
          "6",
          "7",
          "10"
        ],
        "explanation": "Starting at 2, the updates give 4, then 6, then 8; the next condition 8 < 7 is false.",
        "skill": "JavaScript and page behaviour",
        "code": "var x = 2;\nwhile (x < 7) {\n  x = x + 2;\n}",
        "language": "JavaScript"
      },
      {
        "id": "13-javascript-9",
        "prompt": "What is JavaScript’s role in a browser-based interactive page?",
        "answer": "Respond to events and change content",
        "options": [
          "Respond to events and change content",
          "Replace every HTML element always",
          "Provide network routing hardware",
          "Guarantee server-side security"
        ],
        "explanation": "Client-side JavaScript can respond to user actions, calculate values and update the document.",
        "skill": "JavaScript and page behaviour"
      },
      {
        "id": "13-javascript-10",
        "prompt": "Why can browser JavaScript not be the sole protection for a database update?",
        "answer": "Client code can be bypassed",
        "options": [
          "Client code can be bypassed",
          "Browsers cannot display forms",
          "JavaScript never supports conditions",
          "SQL must run inside a CSS rule"
        ],
        "explanation": "The trusted server must check permissions and validate submitted data because a client can be altered or bypassed.",
        "skill": "JavaScript and page behaviour"
      }
    ]
  },
  {
    "id": "13-js-form",
    "section": "1.3",
    "spec": "1.3.4(a)",
    "title": "OCR Appendix 5d: JavaScript forms and output",
    "lessons": [
      152
    ],
    "page": 123,
    "questions": [
      {
        "id": "13-js-form-1",
        "prompt": "For a text input whose current value is 75, what does accessing its .value property return?",
        "answer": "The text string \"75\"",
        "options": [
          "The text string \"75\"",
          "The number 75",
          "The Boolean value true",
          "The element's id"
        ],
        "explanation": "A text input's value is a string until code converts it.",
        "skill": "OCR Appendix 5d: JavaScript forms and output",
        "source": "Final H446 Paper 1, OCR Appendix 5d JS form cycle (pages 369–372)",
        "code": "<input type=\"text\" id=\"mark\" value=\"75\">\nlet value = document.getElementById(\"mark\").value;"
      },
      {
        "id": "13-js-form-2",
        "prompt": "What numeric result is stored in total?",
        "answer": "9",
        "options": [
          "9",
          "72",
          "\"72\"",
          "5"
        ],
        "explanation": "Number converts the text \"7\" to numeric 7 before adding 2.",
        "skill": "OCR Appendix 5d: JavaScript forms and output",
        "source": "Final H446 Paper 1, OCR Appendix 5d JS form cycle (pages 369–372)",
        "code": "let total = Number(\"7\") + 2;"
      },
      {
        "id": "13-js-form-3",
        "prompt": "What text will be placed in the result paragraph when the input is 70?",
        "answer": "Distinction",
        "options": [
          "Distinction",
          "Keep practising",
          "70",
          "Ready"
        ],
        "explanation": "70 meets the inclusive >= 70 test, so the first branch sets the paragraph text.",
        "skill": "OCR Appendix 5d: JavaScript forms and output",
        "source": "Final H446 Paper 1, OCR Appendix 5d JS form cycle (pages 369–372)",
        "code": "let m = Number(document.getElementById(\"mark\").value);\nconst result = document.getElementById(\"result\");\nif (m >= 70) result.textContent = \"Distinction\";\nelse result.textContent = \"Keep practising\";"
      },
      {
        "id": "13-js-form-4",
        "prompt": "What text will be placed in the result paragraph for input 69?",
        "answer": "Keep practising",
        "options": [
          "Keep practising",
          "Distinction",
          "69",
          "Ready"
        ],
        "explanation": "69 is below the threshold, so the else branch changes the displayed text.",
        "skill": "OCR Appendix 5d: JavaScript forms and output",
        "source": "Final H446 Paper 1, OCR Appendix 5d JS form cycle (pages 369–372)",
        "code": "let m = Number(document.getElementById(\"mark\").value);\nconst result = document.getElementById(\"result\");\nif (m >= 70) result.textContent = \"Distinction\";\nelse result.textContent = \"Keep practising\";"
      },
      {
        "id": "13-js-form-5",
        "prompt": "What does return false do in this form handler?",
        "answer": "Prevent the form's usual submission/navigation",
        "options": [
          "Prevent the form's usual submission/navigation",
          "Clear the text input",
          "Force the condition to be false",
          "Delete the HTML form"
        ],
        "explanation": "After checkMark() runs, returning false stops the default submit action.",
        "skill": "OCR Appendix 5d: JavaScript forms and output",
        "source": "Final H446 Paper 1, OCR Appendix 5d JS form cycle (pages 369–372)",
        "code": "<form onsubmit=\"checkMark(); return false;\">"
      },
      {
        "id": "13-js-form-6",
        "prompt": "What does this statement change if an element with id result exists?",
        "answer": "The text shown inside the existing result element",
        "options": [
          "The text shown inside the existing result element",
          "The input's current value",
          "The element's HTML id",
          "The address of the web page"
        ],
        "explanation": "textContent assigns the element's text content rather than changing its id or the input value.",
        "skill": "OCR Appendix 5d: JavaScript forms and output",
        "source": "Final H446 Paper 1, OCR Appendix 5d JS form cycle (pages 369–372)",
        "code": "document.getElementById(\"result\").textContent = \"Ready\";"
      },
      {
        "id": "13-js-form-7",
        "prompt": "Which output mechanism shows a browser dialog rather than writing text into the page?",
        "answer": "alert(\"Ready\")",
        "options": [
          "alert(\"Ready\")",
          "document.write(\"Ready\")",
          "result.textContent = \"Ready\"",
          "console.log(\"Ready\")"
        ],
        "explanation": "alert displays a browser dialog; the others write to the document, an element or the console.",
        "skill": "OCR Appendix 5d: JavaScript forms and output",
        "source": "Final H446 Paper 1, OCR Appendix 5d JS form cycle (pages 369–372)"
      },
      {
        "id": "13-js-form-8",
        "prompt": "What value does checkMark compare with 80?",
        "answer": "The numeric value read from the mark field",
        "options": [
          "The numeric value read from the mark field",
          "The literal word mark",
          "The submit button's text",
          "The form's action URL"
        ],
        "explanation": "getElementById locates the mark input; .value reads its text; Number converts it.",
        "skill": "OCR Appendix 5d: JavaScript forms and output",
        "source": "Final H446 Paper 1, OCR Appendix 5d JS form cycle (pages 369–372)",
        "code": "let m = Number(document.getElementById(\"mark\").value);\nif (m >= 80) alert(\"Pass\");"
      },
      {
        "id": "13-js-form-9",
        "prompt": "In this example, which attribute makes the input addressable by getElementById(\"mark\")?",
        "answer": "id=\"mark\"",
        "options": [
          "id=\"mark\"",
          "name=\"mark\"",
          "type=\"text\"",
          "value=\"75\""
        ],
        "explanation": "getElementById searches the id attribute. name has a different role in submitted form data.",
        "skill": "OCR Appendix 5d: JavaScript forms and output",
        "source": "Final H446 Paper 1, OCR Appendix 5d JS form cycle (pages 369–372)",
        "code": "<input type=\"text\" id=\"mark\" name=\"mark\" value=\"75\">"
      },
      {
        "id": "13-js-form-10",
        "prompt": "What normally happens when a user activates this submit button inside the form?",
        "answer": "The form's submit handler runs",
        "options": [
          "The form's submit handler runs",
          "All fields become numbers",
          "The button changes to a text field",
          "The browser ignores the form"
        ],
        "explanation": "The submit control triggers submission; an onsubmit handler can process values and stop the usual navigation.",
        "skill": "OCR Appendix 5d: JavaScript forms and output",
        "source": "Final H446 Paper 1, OCR Appendix 5d JS form cycle (pages 369–372)",
        "code": "<form onsubmit=\"checkMark(); return false;\">\n<input type=\"submit\" value=\"Check\">\n</form>"
      }
    ]
  },
  {
    "id": "13-search",
    "section": "1.3",
    "spec": "1.3.4(b)",
    "title": "Search engine crawling and indexing",
    "lessons": [
      154
    ],
    "page": 124,
    "questions": [
      {
        "id": "13-search-1",
        "prompt": "What does a web crawler do?",
        "answer": "Discover and retrieve web pages",
        "options": [
          "Discover and retrieve web pages",
          "Answer every query by manual browsing",
          "Encrypt every indexed file",
          "Allocate all public IP addresses"
        ],
        "explanation": "A crawler follows links and other discovery sources to fetch pages for processing by a search engine.",
        "skill": "Search engine crawling and indexing"
      },
      {
        "id": "13-search-2",
        "prompt": "What is a search engine index used for?",
        "answer": "Finding relevant pages efficiently",
        "options": [
          "Finding relevant pages efficiently",
          "Storing every user’s private key",
          "Routing all packets",
          "Rendering HTML on the user’s device"
        ],
        "explanation": "The index records searchable information so queries need not scan the entire live web.",
        "skill": "Search engine crawling and indexing"
      },
      {
        "id": "13-search-3",
        "prompt": "What does an inverted index commonly map?",
        "answer": "Terms to documents containing them",
        "options": [
          "Terms to documents containing them",
          "IP addresses to MAC addresses only",
          "Passwords to plaintext",
          "Only page numbers to colours"
        ],
        "explanation": "For each indexed term, an inverted index identifies documents or occurrences associated with that term.",
        "skill": "Search engine crawling and indexing"
      },
      {
        "id": "13-search-4",
        "prompt": "Why does a search engine revisit pages?",
        "answer": "Content and links can change",
        "options": [
          "Content and links can change",
          "HTML can only be read once",
          "Every page expires after one visit",
          "Indexes must contain no current data"
        ],
        "explanation": "Recrawling refreshes information about changed, added or removed web content.",
        "skill": "Search engine crawling and indexing"
      },
      {
        "id": "13-search-5",
        "prompt": "When a user submits a search, what is normally searched first?",
        "answer": "The search engine’s stored index",
        "options": [
          "The search engine’s stored index",
          "Every live web page in turn",
          "Only the user’s DNS cache",
          "Every private school database"
        ],
        "explanation": "Queries normally use a previously built index, with ranking selecting and ordering candidate results.",
        "skill": "Search engine crawling and indexing"
      },
      {
        "id": "13-search-6",
        "prompt": "Why might a newly published page be absent from results?",
        "answer": "It has not been indexed yet",
        "options": [
          "It has not been indexed yet",
          "New HTML is always invalid",
          "DNS refuses all new pages",
          "It must use a public password"
        ],
        "explanation": "Discovery, crawling and indexing can take time; publication alone does not guarantee immediate inclusion.",
        "skill": "Search engine crawling and indexing"
      },
      {
        "id": "13-search-7",
        "prompt": "How do hyperlinks help a crawler?",
        "answer": "Provide routes to other pages",
        "options": [
          "Provide routes to other pages",
          "Automatically prove every claim",
          "Encrypt destination documents",
          "Guarantee the fastest route"
        ],
        "explanation": "Links can reveal additional page addresses for a crawler to discover and fetch.",
        "skill": "Search engine crawling and indexing"
      },
      {
        "id": "13-search-8",
        "prompt": "Why store useful page information alongside indexed terms?",
        "answer": "Help retrieve and rank results",
        "options": [
          "Help retrieve and rank results",
          "Replace the need for any query",
          "Make every page equally relevant",
          "Delete all original content"
        ],
        "explanation": "Information such as term occurrence and page location helps identify and order useful matches.",
        "skill": "Search engine crawling and indexing"
      },
      {
        "id": "13-search-9",
        "prompt": "Does being indexed guarantee a page ranks first for every query?",
        "answer": "No",
        "options": [
          "No",
          "Yes, for all new pages",
          "Only if it contains HTML",
          "Only with an image"
        ],
        "explanation": "Index inclusion means it can be considered; relevance and ranking determine where it appears for a query.",
        "skill": "Search engine crawling and indexing"
      },
      {
        "id": "13-search-10",
        "prompt": "Why can search results show outdated information?",
        "answer": "The index may not reflect changes yet",
        "options": [
          "The index may not reflect changes yet",
          "The web never changes",
          "Every query rewrites the website",
          "DNS stores all search snippets"
        ],
        "explanation": "Search operates on stored information that may lag behind the current live page until refreshed.",
        "skill": "Search engine crawling and indexing"
      }
    ]
  },
  {
    "id": "13-pagerank",
    "section": "1.3",
    "spec": "1.3.4(c)",
    "title": "PageRank and link importance",
    "lessons": [
      155
    ],
    "page": 124,
    "questions": [
      {
        "id": "13-pagerank-1",
        "prompt": "At a high level, what does PageRank estimate from links?",
        "answer": "A page’s link-based importance",
        "options": [
          "A page’s link-based importance",
          "Its exact factual accuracy",
          "Its file size in bytes",
          "Its DNS cache lifetime"
        ],
        "explanation": "PageRank models importance through the web’s link structure; it does not directly verify a page’s truth.",
        "skill": "PageRank and link importance"
      },
      {
        "id": "13-pagerank-2",
        "prompt": "Why can one incoming link from an important page matter more than several weak links?",
        "answer": "Importance is passed through links",
        "options": [
          "Importance is passed through links",
          "Every link has the same weight always",
          "Only page colour matters",
          "The newest page always wins"
        ],
        "explanation": "A link’s contribution depends in part on the linking page’s own rank and its outgoing links.",
        "skill": "PageRank and link importance"
      },
      {
        "id": "13-pagerank-3",
        "prompt": "In a simplified equal-share model, page A has rank 0.6 and three outgoing links. How much does each link receive before damping?",
        "answer": "0.2",
        "options": [
          "0.2",
          "0.6",
          "1.8",
          "0.3"
        ],
        "explanation": "The model splits rank equally across outgoing links: 0.6 divided by 3 = 0.2.",
        "skill": "PageRank and link importance"
      },
      {
        "id": "13-pagerank-4",
        "prompt": "A page receives contributions 0.2 and 0.3. Ignore damping and all other contributions. What is its next score?",
        "answer": "0.5",
        "options": [
          "0.5",
          "0.06",
          "0.1",
          "0.6"
        ],
        "explanation": "Add the incoming contributions under the stated model: 0.2 + 0.3 = 0.5.",
        "skill": "PageRank and link importance"
      },
      {
        "id": "13-pagerank-5",
        "prompt": "Why are PageRank estimates commonly updated repeatedly?",
        "answer": "Linking pages’ ranks also change",
        "options": [
          "Linking pages’ ranks also change",
          "Every page must be deleted first",
          "DNS gives new ranks each second",
          "Only the first link matters"
        ],
        "explanation": "Ranks depend on other ranks, so iterative updates can refine the estimates across the link graph.",
        "skill": "PageRank and link importance"
      },
      {
        "id": "13-pagerank-6",
        "prompt": "If a page adds more outgoing links, what happens to each equal share of its unchanged rank?",
        "answer": "It becomes smaller",
        "options": [
          "It becomes smaller",
          "It becomes larger",
          "It stays equal to the full rank",
          "It becomes the page’s byte size"
        ],
        "explanation": "With fixed total rank, dividing among more outgoing links reduces the contribution per link in this model.",
        "skill": "PageRank and link importance"
      },
      {
        "id": "13-pagerank-7",
        "prompt": "What does a damping or random-jump component represent in a PageRank model?",
        "answer": "A chance of moving without following a link",
        "options": [
          "A chance of moving without following a link",
          "A chance of deleting the internet",
          "The browser’s download speed",
          "An encryption-key length"
        ],
        "explanation": "A random-surfer model includes occasional jumps rather than always following the current page’s links.",
        "skill": "PageRank and link importance"
      },
      {
        "id": "13-pagerank-8",
        "prompt": "Does a high PageRank alone mean a page is the best answer to a specific query?",
        "answer": "No",
        "options": [
          "No",
          "Yes, regardless of subject",
          "Only if it has no text",
          "Only for short queries"
        ],
        "explanation": "Link importance is distinct from query relevance and is only one possible component of search ranking.",
        "skill": "PageRank and link importance"
      },
      {
        "id": "13-pagerank-9",
        "prompt": "A contributes 0.3 to C and B contributes 0.1 to C. Ignore damping. What total contribution reaches C?",
        "answer": "0.4",
        "options": [
          "0.4",
          "0.2",
          "0.03",
          "0.3"
        ],
        "explanation": "Sum the two incoming contributions: 0.3 + 0.1 = 0.4.",
        "skill": "PageRank and link importance"
      },
      {
        "id": "13-pagerank-10",
        "prompt": "Why is merely counting incoming links an incomplete description of PageRank?",
        "answer": "The sources’ importance also matters",
        "options": [
          "The sources’ importance also matters",
          "Incoming links are never used",
          "All links are private",
          "Only text length is considered"
        ],
        "explanation": "PageRank weights link contributions using source ranks and outgoing-link structure, rather than treating all incoming links identically.",
        "skill": "PageRank and link importance"
      }
    ]
  },
  {
    "id": "13-processing",
    "section": "1.3",
    "spec": "1.3.4(d)",
    "title": "Client-side and server-side processing",
    "lessons": [
      153,
      156
    ],
    "page": 122,
    "questions": [
      {
        "id": "13-processing-1",
        "prompt": "Where does client-side processing normally run for a web page?",
        "answer": "In the user’s browser",
        "options": [
          "In the user’s browser",
          "Only in the database server",
          "Only in the DNS root",
          "In every network switch"
        ],
        "explanation": "Client-side code executes on the user’s device, commonly inside the browser.",
        "skill": "Client-side and server-side processing"
      },
      {
        "id": "13-processing-2",
        "prompt": "Where should the authoritative check of a user’s database permissions run?",
        "answer": "On the trusted server",
        "options": [
          "On the trusted server",
          "Only in editable browser code",
          "In a CSS stylesheet",
          "In the page’s title"
        ],
        "explanation": "The server must enforce access control because the client cannot be trusted to enforce its own permissions.",
        "skill": "Client-side and server-side processing"
      },
      {
        "id": "13-processing-3",
        "prompt": "What is a benefit of client-side form feedback?",
        "answer": "Immediate response without a server trip",
        "options": [
          "Immediate response without a server trip",
          "Guaranteed data authenticity",
          "No need for server checks",
          "Universal identical device speed"
        ],
        "explanation": "Local checks can provide prompt feedback and avoid unnecessary requests, while server checks remain essential.",
        "skill": "Client-side and server-side processing"
      },
      {
        "id": "13-processing-4",
        "prompt": "Why should a web app not embed a secret database password in downloaded JavaScript?",
        "answer": "Users can inspect downloaded code",
        "options": [
          "Users can inspect downloaded code",
          "JavaScript cannot contain strings",
          "All passwords must be public",
          "Browsers automatically encrypt the source"
        ],
        "explanation": "Code and data delivered to the browser are accessible to its user, so server secrets belong on trusted infrastructure.",
        "skill": "Client-side and server-side processing"
      },
      {
        "id": "13-processing-5",
        "prompt": "Which task is naturally suited to server-side processing?",
        "answer": "Update a shared booking database",
        "options": [
          "Update a shared booking database",
          "Animate a local hover effect only",
          "Read a click coordinate only",
          "Change a paragraph’s colour only"
        ],
        "explanation": "The server can coordinate shared state and enforce transactions and permissions for booking changes.",
        "skill": "Client-side and server-side processing"
      },
      {
        "id": "13-processing-6",
        "prompt": "What is a possible cost of relying on server processing for every small interaction?",
        "answer": "More requests and latency",
        "options": [
          "More requests and latency",
          "No network traffic ever",
          "No need for server capacity",
          "Every client needs a database copy"
        ],
        "explanation": "Round trips take time and add server workload, so some immediate interface work is better done locally.",
        "skill": "Client-side and server-side processing"
      },
      {
        "id": "13-processing-7",
        "prompt": "Can both client and server validate the same submitted field?",
        "answer": "Yes",
        "options": [
          "Yes",
          "No, validation must run once",
          "Only if the field is text",
          "Only if the client is trusted"
        ],
        "explanation": "Client checks improve usability; server checks protect the authoritative processing of untrusted input.",
        "skill": "Client-side and server-side processing"
      },
      {
        "id": "13-processing-8",
        "prompt": "A browser calculates a provisional shopping total. Why should the server recalculate it at checkout?",
        "answer": "The client’s total can be changed",
        "options": [
          "The client’s total can be changed",
          "Arithmetic is impossible in JavaScript",
          "HTML always doubles prices",
          "DNS must approve every price"
        ],
        "explanation": "The server must use trusted prices and rules instead of accepting a potentially manipulated client total.",
        "skill": "Client-side and server-side processing"
      },
      {
        "id": "13-processing-9",
        "prompt": "Which is a typical client-side task?",
        "answer": "Show or hide form guidance",
        "options": [
          "Show or hide form guidance",
          "Authorise a bank transfer alone",
          "Commit a shared database transaction",
          "Keep a server’s private key secret"
        ],
        "explanation": "Local interface changes can respond immediately without altering authoritative shared data.",
        "skill": "Client-side and server-side processing"
      },
      {
        "id": "13-processing-10",
        "prompt": "Why can server-side processing provide consistent central business rules?",
        "answer": "The service controls their execution",
        "options": [
          "The service controls their execution",
          "Every client has identical hardware",
          "Network requests cannot be forged",
          "It removes all need for testing"
        ],
        "explanation": "The service can apply the same trusted rules to submissions from different clients, provided it is implemented correctly.",
        "skill": "Client-side and server-side processing"
      }
    ]
  }
];
