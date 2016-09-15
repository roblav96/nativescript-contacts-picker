
declare class EPContact extends NSObject {

	static alloc(): EPContact; // inherited from NSObject

	static new(): EPContact; // inherited from NSObject

	birthday: Date;

	birthdayString: string;

	company: string;

	contactId: string;

	firstName: string;

	lastName: string;

	profileImage: UIImage;

	thumbnailProfileImage: UIImage;

	// constructor(o: { contact: CNContact; });

	contactInitials(): string;

	displayName(): string;

	// initWithContact(contact: CNContact): this;
}

declare class EPContactsPicker extends UITableViewController implements UIBarPositioningDelegate, UISearchBarDelegate, UISearchResultsUpdating {

	static alloc(): EPContactsPicker; // inherited from NSObject

	static new(): EPContactsPicker; // inherited from NSObject

	contactDelegate: EPPickerDelegate;

	/* readonly */ debugDescription: string; // inherited from NSObjectProtocol

	/* readonly */ description: string; // inherited from NSObjectProtocol

	/* readonly */ hash: number; // inherited from NSObjectProtocol

	// /* readonly */ isProxy: boolean; // inherited from NSObjectProtocol

	/* readonly */ superclass: typeof NSObject; // inherited from NSObjectProtocol

	/* readonly */  // inherited from NSObjectProtocol

	constructor(o: { delegate: EPPickerDelegate; });

	constructor(o: { delegate: EPPickerDelegate; multiSelection: boolean; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithDelegate(delegate: EPPickerDelegate): this;

	initWithDelegateMultiSelection(delegate: EPPickerDelegate, multiSelection: boolean): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	positionForBar(bar: UIBarPositioning): UIBarPosition;

	reloadContacts(): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	searchBarBookmarkButtonClicked(searchBar: UISearchBar): void;

	searchBarCancelButtonClicked(searchBar: UISearchBar): void;

	searchBarResultsListButtonClicked(searchBar: UISearchBar): void;

	searchBarSearchButtonClicked(searchBar: UISearchBar): void;

	searchBarSelectedScopeButtonIndexDidChange(searchBar: UISearchBar, selectedScope: number): void;

	searchBarShouldBeginEditing(searchBar: UISearchBar): boolean;

	searchBarShouldChangeTextInRangeReplacementText(searchBar: UISearchBar, range: NSRange, text: string): boolean;

	searchBarShouldEndEditing(searchBar: UISearchBar): boolean;

	searchBarTextDidBeginEditing(searchBar: UISearchBar): void;

	searchBarTextDidChange(searchBar: UISearchBar, searchText: string): void;

	searchBarTextDidEndEditing(searchBar: UISearchBar): void;

	self(): this;

	updateSearchResultsForSearchController(searchController: UISearchController): void;
}

declare var EPContactsPickerVersionNumber: number;

// declare var EPContactsPickerVersionString: interop.Reference<number>;

interface EPPickerDelegate {

	epContactPickerDidCancel?(_: EPContactsPicker, error: NSError): void;

	epContactPickerDidContactFetchFailed?(_: EPContactsPicker, error: NSError): void;

	epContactPickerDidSelectContact?(_: EPContactsPicker, contact: EPContact): void;

	epContactPickerDidSelectMultipleContacts?(_: EPContactsPicker, contacts: NSArray): void;
}
declare var EPPickerDelegate: {

	prototype: EPPickerDelegate;
};
