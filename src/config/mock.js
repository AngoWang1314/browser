const getInitData = {
  authTypes: [
    {id: 'catalog', name: '目录', isUsed: false},
    {id: 'menu', name: '菜单', isUsed: true},
    {id: 'button', name: '按钮', isUsed: true}
  ],
  displayModes: [
    {id: 'currentWindow', name: '当前窗口'},
    {id: 'newwindow', name: '新窗口/新标签'},
    {id: 'dialogWindow', name: '弹出窗口'},
    {id: 'browserWindow', name: '弹出浏览器窗口'}
  ],
  sexes: [
    {id: 'male', name: '男'},
    {id: 'female', name: '女'}
  ],
  status: [
    {id: 'prohibite', name: '禁用'},
    {id: 'normal', name: '正常'},
    {id: 'unusable', name: '停用'},
    {id: 'prohibite', name: '禁用'}
  ]
}
const getParentAuth = [
  {id: '5c3c54f286885e2788b43fd2', name: '主页'},
  {id: '5c3da5d2671ac11a741d56b6', name: '用户管理'},
  {id: '5c3da64a671ac11a741d56b7', name: '角色管理'},
  {id: '5c3da85c671ac11a741d56b8', name: '权限管理'}
]
const getAuthList = {
  rows: [
    {
      authSign: 'system:home:view',
      authType: 'menu',
      id: '5c3c54f286885e2788b43fd2',
      isDisplay: true,
      location: '#/home/index',
      name: '主页',
      remark: '均有权限'
    },
    {
      authSign: 'system:userManage:view',
      authType: 'menu',
      id: '5c3da5d2671ac11a741d56b6',
      isDisplay: true,
      location: '#/userManage/index',
      name: '用户管理'
    },
    {
      authSign: 'system:roleManage:view',
      authType: 'menu',
      id: '5c3da64a671ac11a741d56b7',
      isDisplay: true,
      location: '#/roleManage/index',
      name: '角色管理'
    },
    {
      authSign: 'system:authManage:index',
      authType: 'menu',
      id: '5c3da85c671ac11a741d56b8',
      isDisplay: true,
      location: '#/authManage/index',
      name: '权限管理'
    },
    {
      authSign: 'system:userManage:create',
      authType: 'button',
      id: '5c3dac40671ac11a741d56b9',
      isDisplay: true,
      location: '#/userManage/create',
      name: '新建用户'
    },
    {
      authSign: 'system:userManage:edit',
      authType: 'button',
      id: '5c3e8ea2aa6d031f90bfcf43',
      isDisplay: true,
      location: '#/userManage/edit',
      name: '编辑用户'
    },
    {
      authSign: 'system:userManage:resetPwd',
      authType: 'button',
      id: '5c3e91dcaa6d031f90bfcf45',
      isDisplay: true,
      location: '#/userManage/index',
      name: '重置密码'
    },
    {
      authSign: 'system:userManage:index',
      authType: 'button',
      id: '5c3e9340aa6d031f90bfcf46',
      isDisplay: true,
      location: '#/userManage/index',
      name: '停用用户'
    },
    {
      authSign: 'system:userManage:prohibite',
      authType: 'button',
      id: '5c3e966caa6d031f90bfcf47',
      isDisplay: true,
      location: '#/userManage/index',
      name: '禁用账号'
    },
    {
      authSign: 'system:roleManage:create',
      authType: 'button',
      id: '5c3e96cbaa6d031f90bfcf48',
      isDisplay: true,
      location: '#/roleManage/create',
      name: '新建角色'
    }
  ],
  totalCount: 12
}
const getRoleList = {
  rows: [
    {
      createdAt: 1546998704524,
      createdBy: '-',
      desc: '测试用',
      id: '5c3553b054539e2a7026b69d',
      key: 'admin',
      name: '管理员'
    }, {
      createdAt: 1547628597766,
      createdBy: '-',
      desc: 'aa',
      id: '5c3553b054539e2a7026b69d',
      key: 'aa',
      name: 'cc'
    }
  ],
  totalCount: 2
}
const getUserList = {
  rows: [
    {
      email: '1010136336@qq.com',
      id: '5c3858c135f2bf29984dc868',
      mobile: '13560472222',
      remark: '',
      sex: 'male',
      status: 'unusable',
      username: '刘灿融'
    }, {
      email: '13560475555@qq.com',
      id: '5c4690fbcc000b261c1c13d4',
      mobile: '13560475555',
      remark: '',
      sex: 'male',
      status: 'normal',
      username: 'aa'
    }, {
      email: '13560475556@qq.com',
      id: '5c46b697f591e01648886102',
      mobile: '13560475556',
      remark: '',
      sex: 'female',
      status: 'normal',
      username: 'aa'
    }
  ],
  totalCount: 3
}
export default {
  getInitData: getInitData,
  getParentAuth: getParentAuth,
  getAuthList: getAuthList,
  getRoleList: getRoleList,
  getUserList: getUserList
}