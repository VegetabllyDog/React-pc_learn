import React from 'react'

import Slider from '@/components/slider' // 轮播图
import RecommendList from '@/components/list' // 推荐列表

import Scroll from '@/baseUI/scroll/index' // 移动端滑动组件
import { Content, RedDiv, WhiteBackground } from './style' // 移动端滑动组件的style-dom

import { connect } from 'react-redux' // 增加和redux的连接
import * as actionTypes from './store/actionCreators' // 连接Recommend下的actionTypes

import { forceCheck } from 'react-lazyload' // 懒加载的监听事件

import Loading from '@/baseUI/loading' // 加入手写的loading覆盖组件

import { renderRoutes } from 'react-router-config'

function Recommend(props) {
  console.log('传给Recommend的props=', props)
  const { bannerList, recommendList } = props // redux的传值
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props // redux的传方法

  // 只在首次render创建后跑一次，执行connect传给props的两个方法，去调用接口获取新数据存入redux
  React.useEffect(() => {
    console.log('-----------------初次render结束了，Recommend的useEffect事件，开始启动异步调用数据')
    getBannerDataDispatch()
    getRecommendListDataDispatch()
    //eslint-disable-next-line
  }, []);

  // 这两个也是connect传给props的参数，来源指向redux中的存值
  console.log(bannerList)
  console.log(recommendList)

  // 要取出来使用了，从immutable转回js
  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  console.log('计算的bannerListJS=', bannerListJS)
  console.log('r计算的ecommendListJS=', recommendListJS)

  return (
    // Content 外包裹，给Scroll固定的父dom
    <Content>
      {/* <Loading /> */}
      {props.enterloading ? <Loading /> : null}
      {/* RedDiv 轮播图的红色背景边 */}
      <RedDiv />
      <Scroll onScroll={forceCheck}>
        {/* WhiteBackground 给Scroll拖动时保持的白底色 */}
        <WhiteBackground>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </WhiteBackground>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Content>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上，这个参数的state就是store里的state
// （将 store 中的数据加入 props 绑定到组件上）
// 此时state的形式还是immutable，不是普通对象
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  // getIn immutable的语法，取state下的recommend下的bannerList的内容（取出来还是immutable格式）
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterloading: state.getIn(['recommend', 'enterLoading']) // 同样提取redux中的loading到组件的props里
})

// 映射redux的dispatch方法，return值会赋值到props上
// 这个参数dispatch就是从redux里取出来的store.dispatch的方法
// 下方内容理解，给props映射增加内容，例如
// 给props增加getBannerDataDispatch，内容是一个调用dispatch(action)的函数方法
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList())
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList())
    }
  }
}

// 将 ui 组件包装成容器组件
// 这里可以理解为，用redux的connect方法，对Recommend组件执行了上面声明的mapStateToProps、mapDispatchToProps两个方法的props赋值；
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))

// export default React.memo(Recommend)