import Ember from 'ember';
//import config from './config/environment';
import base from 'mura/mixins/base-content';
import mura from 'mura/mura';

export default Ember.Route.extend(base,{
  model:function(){
    var self=this;
   
    //alert(config.locationType)
    mura.currentfilename=window.location.hash.substr(2);
    //mura.currentfilename=window.location.pathname;
    //alert(mura.currentfilename)
    return this.store.find('content', mura.currentfilename).then(function(content){
      mura.contentid=content.get('contentid');
      mura.contenthistid=content.get('contenthistid');
      return content;
    });
  },
  renderTemplate: function(controller, model){
    this._super(controller, model);
    this.render('content');
   
  },
  setupController: function(controller,model){
    this._super(controller,model);
    var self=this;

    this.controllerFor('content').set('model',model);
    //this.controllerFor('content').set('home',this.store.find('Content','00000000000000000000000000000000001'));  
    var appController=this.controllerFor('application');
    appController.set('htmlheadqueue',model.get('htmlheadqueue')); 
    appController.set('htmlfootqueue',model.get('htmlfootqueue'));
    appController.set('displayregions',model.get('displayregions'));

  }
});