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
  urltitle: DS.attr(),
  parentid: DS.attr(),
  altfilename: DS.attr(),
  fileext: DS.attr(),
  campaignid: DS.attr(),
  totalconvpoints: DS.attr(),
  versionconvpoints: DS.attr(),
  stageid: DS.attr(),
  stagepoints: DS.attr(),
  personaid: DS.attr(),
  personapoints: DS.attr(),
  changesetname: DS.attr(),
  socialtotal: DS.attr(),
  iconclass:  DS.attr(),
  convrole: DS.attr(),
  parent:  DS.belongsTo('contentnav',{async:true,inverse:'kids'}),
  kids:  DS.hasMany('contentnav',{async:true,inverse:'parent'}),
  site:  DS.belongsTo('contentnav',{async:true}),
  images: DS.attr(),
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
  socialmediaediturl:  function() {
    return 'social/socialMedia.cfm?contentID=' + this.get('contentid') + '&contenthistid=' + this.get('contenthistid');
  }.property('contentid').property('contenthistid'),
  editurl:  function() {
    return '../../admin/?muraAction=cArch.edit&contentID=' + this.get('contentid') + '&contentHistID=' + this.get('contenthistid') + '&type=' + this.get('type') + '&parentid=' + this.get('parentid') + '&topid=' + this.get('contentid') + '&siteid=' + this.get('siteid') + '&moduleid=' + this.get('moduleid') + '&startrow=1';
  }.property('contentid')
});
