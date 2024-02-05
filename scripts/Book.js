export default class Book {
	// A book has a title and author
	constructor(title, author) {
		this.title = title;   // Book Title
		this.author = author; // Book Author
		this._onLoan = false; // Book Loan Status
	}

	// Loan book to library
	loan() {
		this._onLoan = true;
	}

	// Returns book to library
	return() {
		this._onLoan = false;
	}

	// Check if book is available
	get available() {
		return !this._onLoan; // Return opposite of onLoan
	}
}
