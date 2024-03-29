import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from 'react'
import BScroll from 'better-scroll'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`

// 加入手写的loading覆盖组件
import Loading_top_update from '@/baseUI/loading_top_update'
import Loading_bottom_loadmore from '@/baseUI/loading_bottom_loadmore'

const Scroll = forwardRef((props, ref) => {

  // console.log('【scroll】传递给scroll的 props =', props)
  // console.log('【scroll】传递给scroll的 ref =', ref)

  // bScroll，放具体的 better-scroll 的实例对象
  const [bScroll, setBScroll] = useState()

  // 传入的具体dom对象
  const scrollContaninerRef = useRef()

  // console.log('【scroll】获取到存入数据 scrollContaninerRef =', scrollContaninerRef)

  // 拆解props
  const { direction, click, refresh, bounceTop, bounceBottom } = props
  const { pullUp, pullDown, onScroll } = props

  // 首次render刷新后，往bScroll建立实例对象
  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    })
    setBScroll(scroll)
    return () => { // 退出时注销实例对象
      setBScroll(null)
    }
    //eslint-disable-next-line
  }, []);

  // 这三个都是一样的逻辑，若bScroll实例已建立，判断是否存在传入的这仨动作的回调函数，
  // 存在则通过on绑定监听；退出时注销实例；
  // 若存在滑动的回调函数onScroll，
  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll)
    })
    return () => {
      bScroll.off('scroll')
    }
  }, [onScroll, bScroll]) // 只在回调onScroll、实例对象bScroll变化时执行
  // 下面两个同理，改变时挂载上拉、下拉的回调
  useEffect(() => {
    if (!bScroll || !pullUp) return
    bScroll.on('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp()
      }
    })
    return () => {
      bScroll.off('scrollEnd')
    }
  }, [pullUp, bScroll])
  useEffect(() => {
    if (!bScroll || !pullDown) return
    bScroll.on('touchEnd', (pos) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDown()
      }
    })
    return () => {
      bScroll.off('touchEnd')
    }
  }, [pullDown, bScroll])

  // refresh 主动刷新
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  // 使用 ref 时自定义暴露给父组件的实例值
  useImperativeHandle(ref, () => ({
    refresh() {
      console.log('Scroll内启动了refresh')
      console.log('bScroll=',bScroll)
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll
      }
    }
  }))

  return (
    <ScrollContainer
        ref={scrollContaninerRef}
        // style={{position:'relative'}}
    >
      {props.children}
      {props.pullUpLoading ? <Loading_top_update /> : null} {/* 顶部 下拉加载动画 */}
      {props.pullDownLoading ? <Loading_bottom_loadmore /> : null} {/* 底部 上拉刷新动画 */}
    </ScrollContainer>
  )
})

// props类型检查
Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),// 滚动的方向
  click: PropTypes.bool,// 是否支持点击
  refresh: PropTypes.bool,// 是否刷新
  onScroll: PropTypes.func,// 滑动触发的回调函数
  pullUp: PropTypes.func,// 上拉加载逻辑
  pullDown: PropTypes.func,// 下拉加载逻辑
  pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向下吸底
}

// props默认值
Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUp: null,
  pullDown: null,
  pullUpLoading: false,
  pullDownLoading: false,
  bounceTop: true,
  bounceBottom: true
}

export default Scroll