import { Component, OnInit, NgZone } from '@angular/core';
import { WindowRefService, ICustomWindow } from '../../paymentService/window-ref.service';


@Component({
  selector: 'app-razorpay',
  templateUrl: './razorpay.component.html',
  styleUrls: ['./razorpay.component.scss']
})
export class RazorpayComponent{

  private _window: ICustomWindow;
  public rzp: any;
  country=['India','USA'];
  public options: any = {
    key: '', // add razorpay key here
    name: 'Nyks',
    description: 'Test Hosting',
    amount: 100, // razorpay takes amount in paisa
    prefill: {
      name: '',
      email: '', // add your email id
      contact:'',
    },
    notes: {},
    theme: {
      color: '#3880FF'
    },
    handler: this.paymentHandler.bind(this),
    modal: {
      ondismiss: (() => {
        this.zone.run(() => {
          // add current page routing if payment fails
          console.log("unsuccessful");
        })
      })
    }
  };

  constructor(
    private zone: NgZone,
    private winRef: WindowRefService
  ) {
    this._window = this.winRef.nativeWindow;
  }

  initPay(): void {
    this.rzp = new this.winRef.nativeWindow['Razorpay'](this.options);
    this.rzp.open();
  }

  paymentHandler(res: any) {
    this.zone.run(() => {
      // add API call here
     console.log(res);
    });
  }


}
