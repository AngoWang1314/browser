import Mock from 'mockjs'

const Random = Mock.Random

const userLogin = () => {
  return {
    token: Random.guid(),
    permissionList: [
      'system:home:view',
      'system:userManage:view',
      'system:roleManage:view',
      'system:authManage:index',
      'system:userManage:create',
      'system:userManage:edit',
      'system:userManage:resetPwd',
      'system:userManage:index',
      'system:userManage:prohibite',
      'system:roleManage:create',
      'system:roleManage:edit',
      'system:roleManage:authConfig',
      'system:roleManage:delete',
      'system:authManage:create',
      'system:authManage:edit',
      'system:authManage:detail',
      'system:authManage:delete'
    ]
  }
}

export default {
  userLogin
}
