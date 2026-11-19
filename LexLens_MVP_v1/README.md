# LexLens Beta (MVP v1)

LexLens checks a contract against Kazakhstan law and quotes the article behind every warning. It is the MVP for the Technological Entrepreneurship final exam at Astana IT University.

Live site: https://arseniiiii-ai.github.io/LexLens/

LexLens is a first-pass check, not legal advice. A lawyer makes the final decision.

## Core user journey

1. Paste a contract, upload a `.txt` or `.docx` file, or pick a sample.
2. Press **Check contract**.
3. Read each warning: the clause with the risky words highlighted, why it matters, the legal basis, the official text of the norm and a link to Adilet.
4. Download the report as an HTML file.

The interface works in English and Kazakh, including error messages. The switch sits in the top right corner. The choice is kept in the address (`?lang=kk`), not in browser storage.

## What version 1 checks

Nine rules, each tied to one norm. Norm texts were copied from the official Adilet portal on 19 November 2026.

| Rule                                           | Severity                                  | Norm                                   |
| ---------------------------------------------- | ----------------------------------------- | -------------------------------------- |
| Price or payment in foreign currency           | Review                                    | Civil Code (General Part), Art. 282(1) |
| Very high penalty, 0.5% a day or more          | Review                                    | Civil Code (General Part), Art. 297    |
| One-sided right to change or refuse            | Review                                    | Civil Code (General Part), Art. 273    |
| Limitation period changed by agreement         | Likely unlawful                           | Civil Code (General Part), Art. 177(2) |
| Liability excluded even for intentional breach | Likely unlawful                           | Civil Code (General Part), Art. 359(3) |
| Market shortage treated as force majeure       | Review                                    | Civil Code (General Part), Art. 359(2) |
| Probation longer than 3 months                 | Review, or likely unlawful above 6 months | Labour Code, Art. 36(2)                |
| Working week longer than 40 hours              | Likely unlawful                           | Labour Code, Art. 68(1)                |
| Annual leave shorter than 24 calendar days     | Likely unlawful                           | Labour Code, Art. 88                   |

Clauses outside these rules are not checked. A result with no warnings does not mean the contract is safe.

## Technical overview

| Item         | Choice                                                                                                                                             |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Platform     | Static website, plain HTML, CSS and JavaScript                                                                                                     |
| Architecture | Everything runs in the browser. `rules.js` splits the text into clauses and applies pattern rules. `app.js` renders results and builds the report. |
| Data storage | None. The contract text stays in the page memory and is gone when the tab closes. No cookies, no local storage, no analytics.                      |
| Integrations | Links to the official texts on adilet.zan.kz. No API calls.                                                                                        |
| Dependencies | None. `.docx` files are read with the browser's own ZIP and XML tools (`docx.js`).                                                                 |
| Deployment   | GitHub Pages from the `main` branch. The same files also open offline from a laptop.                                                               |
| Browsers     | Current Chrome, Edge, Firefox and Safari. Reading `.docx` needs `DecompressionStream` support.                                                     |

### Files

| File         | Purpose                                                 |
| ------------ | ------------------------------------------------------- |
| `index.html` | Page structure and accessibility landmarks              |
| `styles.css` | Brand styles, mobile layout, focus states               |
| `i18n.js`    | All interface text in English and Kazakh                |
| `rules.js`   | The nine rules and the norm base with official quotes   |
| `samples.js` | Two fictional sample contracts with planted risks       |
| `docx.js`    | Reads `.docx` text in the browser                       |
| `app.js`     | Language switch, input checks, results, report download |

### Boundary cases handled

- Empty input or text shorter than 150 characters
- Unsupported file type, such as PDF or images
- Empty file, or a file larger than 2 MB
- A damaged `.docx` file
- Text in a language other than Russian or Kazakh
- A contract with no matching clauses

## Known limitations

- Pattern rules catch typical wording only. Unusual wording can be missed, and a clause can be flagged that a lawyer would accept.
- Nine rules cover a small part of contract law. The roadmap adds rules after a precision audit by practising lawyers.
- Official Kazakh texts of the Labour Code norms are not yet included, so the app shows the Russian official text with a link to the Kazakh page on Adilet.
- PDF and scanned documents are not supported.
- The Kazakh interface text needs a review by a native speaker.

## Development notes

Built with AI coding assistance (Claude) and reviewed by the author. Declared in the project's AI-use declaration.
