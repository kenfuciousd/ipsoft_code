result = parent.currentScript();
if (result > 0) {
  result = 0;
  var propMap = ctxHelper.getMap();
  var attrMap = ctxHelper.getMap();
  propMap.put('type', 'os');
  attrMap.put('(os|type|name|details|description|vendor)', '(?i).*windows.*');
  var osses = ctxHelper.getResourcesMatchingAllPropertiesAnyAttributes(propMap, attrMap).toArray();
  if (osses != null && osses.length > 0) {
     result = 17.0;
  }
}

ctxHelper.getLog().info("after results..");
//ctxHelper.getLog().info("Trying to show propMap: " + propMap.toString());
//ctxHelper.getLog().info("Trying to show attrMap: " + attrMap.toString());


result;
