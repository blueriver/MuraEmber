import Ember from 'ember';
import base from 'mura/mixins/base-content';
import mura from 'mura/mura';

export default Ember.Route.extend(base,{
  model: function() { 
    var self=this;
    var filename='null';
    mura.currentfilename='';
    return this.store.find('content',filename);
  },
  renderTemplate: function(controller, model){
    this._super(controller, model);
    this.render('content');
  },
  setupController: function(controller,model){
    this._super(controller,model);
   
    var self=this;
    
    this.controllerFor('content').set('model',model);

    var appController=this.controllerFor('application'); 
    appController.set('htmlheadqueue',model.get('htmlheadqueue')); 
    appController.set('htmlfootqueue',model.get('htmlfootqueue'));
    appController.set('displayregions',model.get('displayregions')); 

  }
});