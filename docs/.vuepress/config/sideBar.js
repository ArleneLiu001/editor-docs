var barObj = {
  '/blog/': getblogSidebar(),

}
// 博客
function getblogSidebar() {
  return [
    {
      title: '基础',
      collapsable: true,
      children: [
        'chaper1',
        'chaper2',
        'chaper3',
        'chaper4',
        'chaper5',
        'chaper6',
        'chaper7',
        'chaper8',
        'chaper9',
        'chaper10',
      ]
    },
    {
      title: '基础',
      collapsable: false,
      children: [
        'content/chaper1',
        'content/chaper2',
      ]
    },
  ]
}


export default barObj