import DS from "ember-data";

export default DS.Model.extend({
  primaryKey: 'siteid',
  siteid: DS.attr(),
  site: DS.attr()
});
