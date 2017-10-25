import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { GithubApi } from '../../providers/api/github-api';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder,
              public camera: Camera, public gitHubApi:GithubApi) {
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    let results = [];

    if (this.form.value && this.form.value.name) {
      let call = this.gitHubApi.getUserInfo(this.form.value.name);
      call.subscribe(data => {
        // Read the result field from the JSON response.
        results = data['results'];
      }, err => {
        console.log('Something went wrong!');
      });
    }

    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
