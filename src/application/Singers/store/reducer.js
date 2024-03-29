//reducer.js
import * as actionTypes from './constants'
import { fromJS } from 'immutable' // 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构

const defaultState = fromJS({
  singerList: [],         // 歌手列表
  enterLoading: true,     // 控制进场Loading
  pullUpLoading: false,   // 控制上拉加载动画
  pullDownLoading: false, // 控制下拉加载动画
  pageCount: 0,            // 这里是当前页数，我们即将实现分页功能
  hasMorePage: true       // 是否包含继续的分页
})

// 注意这里用的set、get和redux无关，这是因为state默认值被转为了
// immutable数据结构，这是immutable的设置、读取的方法；
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SINGER_LIST:
      return state.set('singerList', action.data)
    case actionTypes.CHANGE_PAGE_COUNT:
      return state.set('pageCount', action.data)
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data)
    case actionTypes.CHANGE_PULLUP_LOADING:
      return state.set('pullUpLoading', action.data)
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      return state.set('pullDownLoading', action.data)
    case actionTypes.CHANGE_HasMorePage:
      return state.set('hasMorePage', action.data)
    default:
      return state
  }
}