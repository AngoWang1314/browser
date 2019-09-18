import Mock from 'mockjs'
const Random = Mock.Random

const getAuthList = () => {
  return {
    rows: [
      {
        authSign: 'system:home:view',
        id: '5c3c54f286885e2788b43fd2',
        name: '主页',
        parentId: '0',
        remark: ''
      },
      {
        authSign: 'system:userManage:view',
        id: '5c3da5d2671ac11a741d56b6',
        name: '用户管理',
        remark: '',
        parentId: '0'
      },
      {
        authSign: 'system:roleManage:view',
        id: '5c3da64a671ac11a741d56b7',
        name: '角色管理',
        remark: '',
        parentId: '0'
      },
      {
        authSign: 'system:authManage:index',
        id: '5c3da85c671ac11a741d56b8',
        name: '权限管理',
        remark: '',
        parentId: '0'
      },
      {
        authSign: 'system:userManage:create',
        id: '5c3dac40671ac11a741d56b9',
        name: '新建用户',
        remark: '',
        parentId: '5c3da5d2671ac11a741d56b6'
      },
      {
        authSign: 'system:userManage:edit',
        id: '5c3e8ea2aa6d031f90bfcf43',
        name: '编辑用户',
        remark: '',
        parentId: '5c3da5d2671ac11a741d56b6'
      },
      {
        authSign: 'system:userManage:resetPwd',
        id: '5c3e91dcaa6d031f90bfcf45',
        name: '重置密码',
        remark: '',
        parentId: '5c3da5d2671ac11a741d56b6'
      },
      {
        authSign: 'system:userManage:index',
        id: '5c3e9340aa6d031f90bfcf46',
        name: '停用用户',
        remark: '',
        parentId: '5c3da5d2671ac11a741d56b6'
      },
      {
        authSign: 'system:userManage:prohibite',
        id: '5c3e966caa6d031f90bfcf47',
        name: '禁用账号',
        remark: '',
        parentId: '5c3da5d2671ac11a741d56b6'
      },
      {
        authSign: 'system:roleManage:create',
        id: '5c3e96cbaa6d031f90bfcf48',
        name: '新建角色',
        remark: '',
        parentId: '5c3da64a671ac11a741d56b7'
      },
      {
        authSign: 'system:roleManage:edit',
        id: '5c3e9707aa6d031f90bfcf49',
        name: '编辑角色',
        remark: '',
        parentId: '5c3da64a671ac11a741d56b7'
      },
      {
        authSign: 'system:roleManage:authConfig',
        id: '5c3e9abaaa6d031f90bfcf4a',
        name: '权限配置',
        remark: '',
        parentId: '5c3da64a671ac11a741d56b7'
      }
    ],
    totalCount: 12
  }
}

const getAuthAll = () => {
  return [
    {
      authSign: 'system:home:view',
      id: '5c3c54f286885e2788b43fd2',
      name: '主页',
      parentId: '0',
      remark: ''
    },
    {
      authSign: 'system:userManage:view',
      id: '5c3da5d2671ac11a741d56b6',
      name: '用户管理',
      remark: '',
      parentId: '0'
    },
    {
      authSign: 'system:roleManage:view',
      id: '5c3da64a671ac11a741d56b7',
      name: '角色管理',
      remark: '',
      parentId: '0'
    },
    {
      authSign: 'system:authManage:index',
      id: '5c3da85c671ac11a741d56b8',
      name: '权限管理',
      remark: '',
      parentId: '0'
    },
    {
      authSign: 'system:userManage:create',
      id: '5c3dac40671ac11a741d56b9',
      name: '新建用户',
      remark: '',
      parentId: '5c3da5d2671ac11a741d56b6'
    },
    {
      authSign: 'system:userManage:edit',
      id: '5c3e8ea2aa6d031f90bfcf43',
      name: '编辑用户',
      remark: '',
      parentId: '5c3da5d2671ac11a741d56b6'
    },
    {
      authSign: 'system:userManage:resetPwd',
      id: '5c3e91dcaa6d031f90bfcf45',
      name: '重置密码',
      remark: '',
      parentId: '5c3da5d2671ac11a741d56b6'
    },
    {
      authSign: 'system:userManage:index',
      id: '5c3e9340aa6d031f90bfcf46',
      name: '停用用户',
      remark: '',
      parentId: '5c3da5d2671ac11a741d56b6'
    },
    {
      authSign: 'system:userManage:prohibite',
      id: '5c3e966caa6d031f90bfcf47',
      name: '禁用账号',
      remark: '',
      parentId: '5c3da5d2671ac11a741d56b6'
    },
    {
      authSign: 'system:roleManage:create',
      id: '5c3e96cbaa6d031f90bfcf48',
      name: '新建角色',
      remark: '',
      parentId: '5c3da64a671ac11a741d56b7'
    },
    {
      authSign: 'system:roleManage:edit',
      id: '5c3e9707aa6d031f90bfcf49',
      name: '编辑角色',
      remark: '',
      parentId: '5c3da64a671ac11a741d56b7'
    },
    {
      authSign: 'system:roleManage:authConfig',
      id: '5c3e9abaaa6d031f90bfcf4a',
      name: '权限配置',
      remark: '',
      parentId: '5c3da64a671ac11a741d56b7'
    },
    {
      authSign: 'system:roleManage:delete',
      id: '5c3ea473aa6d031f90bfcf4b',
      name: '删除角色',
      remark: '',
      parentId: '5c3da64a671ac11a741d56b7'
    },
    {
      authSign: 'system:authManage:detail',
      id: '5c3ea6b5aa6d031f90bfcf4c',
      name: '权限详情',
      remark: '',
      parentId: '5c3da85c671ac11a741d56b8'
    },
    {
      authSign: 'system:authManage:create',
      id: Random.id(),
      name: '新建权限',
      remark: '',
      parentId: '5c3da85c671ac11a741d56b8'
    },
    {
      authSign: 'system:authManage:edit',
      id: Random.id(),
      name: '编辑权限',
      remark: '',
      parentId: '5c3da85c671ac11a741d56b8'
    },
    {
      authSign: 'system:authManage:delete',
      id: '5c3ead88aa6d031f90bfcf4d',
      name: '删除权限',
      remark: '',
      parentId: '5c3da85c671ac11a741d56b8'
    }
  ]
}

const getAuthDetail = () => {
  return {
    authSign: 'system:userManage:view',
    createdAt: 1547544018232,
    displayMode: 'currentWindow',
    name: '用户管理',
    remark: '',
    parentId: '0',
    updatedAt: 1547544018232
  }
}
export default {
  getAuthList,
  getAuthAll,
  getAuthDetail
}
