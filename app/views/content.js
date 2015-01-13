import Ember from 'ember';
import mura from 'mura/mura';

export default Ember.View.extend({
	didInsertElement:function(){
		mura.processHandlers(document);
	},
	contentDidChange:function(){
		//alert('test')
		this.rerender();
	}.observes('controller.model.contenthistid')

});