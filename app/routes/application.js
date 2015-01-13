import Ember from 'ember';
//import config from './config/environment';
import mura from 'mura/mura';

export default Ember.Route.extend({
   actions: {
      goto:function(content){
        alert('testdd')
        window.location=content.get('urlhash');
    }
  },
  setupController: function(controller,model){
    this._super(controller,model);
    controller.set('home',this.store.find('Content','00000000000000000000000000000000001'));  
  }
});