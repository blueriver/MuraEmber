import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    willTransition: function(transition) {
        if(this.controller.get('model.isNew')){
          this.controller.get('model').unloadRecord();
        } 

        if(this.controller.get('model.isDirty')){
          this.controller.get('model').rollback();
        }
        
        return true;
      },
      goto:function(content){
        alert('test from base router')
        window.location=content.get('urlhash');
    }
  }
}
);