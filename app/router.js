import Ember from 'ember';
import DS from "ember-data";
import config from './config/environment';
import mura from 'mura/mura';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.route('index', {path: '/'});
	this.route('customapp', {path: '/customapp'});
  	this.route('content', {path: '/*wildcard'});
});

export default Router;
