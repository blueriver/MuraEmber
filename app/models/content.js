import DS from "ember-data";

export default DS.Model.extend({
  primaryKey: 'contentid',
  contentid: DS.attr(),
  contenthistid: DS.attr(),
  moduleid: DS.attr('string',{defaultValue:'00000000000000000000000000000000000'}),
  siteid: DS.attr(),
  type: DS.attr(),
  subtype: DS.attr(),
  title: DS.attr(),
  menutitle: DS.attr(),
  summary: DS.attr(),
  body: DS.attr(),
  credits: DS.attr(),
  display:  DS.attr(),
  displaystart:  DS.attr(),
  displaystop:  DS.attr(),
  filename: DS.attr(),
  parentid: DS.attr(),
  urltitle: DS.attr(),
  htmlheadqueue: DS.attr(),
  htmlfootqueue: DS.attr(),
  displayregions: DS.attr(),
  altfilename: DS.attr(),
  fileext: DS.attr(),
  images: DS.attr(),
  parent:  DS.belongsTo('contentnav',{async:true}),
  kids:  DS.hasMany('contentnav',{async:true}),
  site:  DS.belongsTo('Site',{async:true}),
  hasparent:  function() {
    return (this.get('parentid')!=='00000000000000000000000000000000END');
  }.property('parentid'),
  urlhash:  function() {
    if(this.get('filename')){
      return '#/' + this.get('filename');
    } else {
      return '#/';
    }
  }.property('filename'),
  editurl:  function() {
    return '../../admin/?muraAction=cArch.edit&contentID=' + this.get('contentid') + '&contentHistID=' + this.get('contenthistid') + '&type=' + this.get('type') + '&parentid=' + this.get('parentid') + '&topid=' + this.get('contentid') + '&siteid=' + this.get('siteid') + '&moduleid=' + this.get('moduleid') + '&startrow=1';
  }.property('contentid')
});



