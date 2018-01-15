/**
 * Called to process the graph before bundling is executed
 * @param {graphlib.Graph} graph Type graph
 * @param {string} root Root node
 * @return {string[]} New bundles
 */
module.exports = function(graph, root) {
    console.log('[Hook] called');

    // To tweak the dynamic instanciation of of DynClass we have 2 options:

    // 1. Direct attribution by creating an edge
    //graph.setEdge('com_Foo', 'com_DynClass');

    // 2. Creating a virtual bundle with the dynamic class
    graph.setNode('manual');
    graph.setEdge('manual', 'com_DynClass');
    return ['manual'];
}
