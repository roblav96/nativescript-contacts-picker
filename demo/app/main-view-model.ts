// 

import {Observable} from 'data/observable';
import {ios} from "application"
import {Page} from "ui/page"
import {Frame, topmost} from "ui/frame"



// class EPPickerDelegateImpl
// 	extends NSObject
// 	implements EPPickerDelegate {

// 	static ObjCProtocols = [EPPickerDelegate]
// 	static new(): EPPickerDelegateImpl {
// 		return <EPPickerDelegateImpl>super.new()
// 	}

// 	epContactPickerDidCancel(picker: EPContactsPicker, error: NSError) {
// 		global.tnsconsole.log('epContactPickerDidCancel')

// 	}

// 	epContactPickerDidContactFetchFailed(picker: EPContactsPicker, error: NSError) {
// 		global.tnsconsole.log('epContactPickerDidContactFetchFailed')
// 	}

// 	epContactPickerDidSelectContact(picker: EPContactsPicker, contact: EPContact) {
// 		global.tnsconsole.log('epContactPickerDidSelectContact')
// 	}

// 	epContactPickerDidSelectMultipleContacts(picker: EPContactsPicker, contacts: NSArray) {
// 		global.tnsconsole.log('epContactPickerDidSelectMultipleContacts')
// 		global.tnsconsole.dump('contacts', contacts)
// 	}

// }

export class HelloWorldModel extends Observable {
	public message: string;

	constructor() {
		super();
		this.message = 'contacts-picker';
	}

	pickit() {
		global.tnsconsole.log('pickit')

		// let delegate: EPPickerDelegateImpl = EPPickerDelegateImpl.new()
		// let scene: EPContactsPicker = EPContactsPicker.new()
		// scene.initWithDelegateMultiSelection(delegate, true)
		// let ctrl: UINavigationController = UINavigationController.new()
		// ctrl.initWithRootViewController(scene)
		// let root: UIViewController = ios.rootController
		// root.presentViewControllerAnimatedCompletion(ctrl, true, null)
		
		
		
		
		
		

	}
}

