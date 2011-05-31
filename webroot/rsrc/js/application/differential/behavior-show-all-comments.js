/**
 * @provides javelin-behavior-differential-show-all-comments
 * @requires javelin-behavior
 *           javelin-stratcom
 *           javelin-dom
 */

JX.behavior('differential-show-all-comments', function(config) {

  var shown = false;
  function reveal(node) {
    if (shown) {
      return;
    }
    shown = true;
    node = node || JX.DOM.find(
      document.body,
      'div',
      'differential-all-comments-container');
    if (node) {
      JX.DOM.setContent(node, JX.$H(config.markup));
    }
  }

  // Reveal the hidden comments if the user clicks "Show All Comments", or if
  // there's an anchor in the URL, since we don't want to link to "#comment-3"
  // and have it collapsed.

  if (window.location.hash) {
    reveal();
  } else {
    JX.Stratcom.listen(
      'hashchange',
      null,
      function(e) {
        if (window.location.hash.match(/comment/)) {
          reveal();
        }
      });
  }

  JX.Stratcom.listen(
    'click',
    'differential-show-all-comments',
    function(e) {
      reveal(e.getNode('differential-all-comments-container'));
      e.kill();
    });

});
