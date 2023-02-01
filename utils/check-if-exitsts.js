function checkIfExists(res) {
  if (!COOKIE_ADDONS[addonName]) {
    return res.render('error', {
      description: `There is no such addon as ${addonName}.`,
    });
  }
}
