var barObj = {
  '/blog/': getblogSidebar(),

}
// 博客
function getblogSidebar() {
  return [
    {
      title: '基础',
      collapsable: false,
      children: [
        'chaper1',
        'chaper3',
        'chaper4',
        'chaper5',
        'chaper6',
        'chaper7',
        'chaper8',
        'chaper9',
        'chaper10',
        'chaper11',
        'chaper12',
        'chaper13',
        'chaper14',
        'chaper15',
      ]
    },
    // {
    //   title: '基础',
    //   collapsable: false,
    //   children: [
    //     'content/chaper1',
    //     'content/chaper2',
    //   ]
    // },
  ]
}


export default barObj