import './index.less'

import { defaultRenderLogoAntTitle } from '../SiderMenu/SiderMenu'
import BaseMenu from '../RouteMenu/BaseMenu'
import { isFun } from '../../utils/util'
import { HeaderViewProps } from '../../Header'

export default {
  name: 'TopNavHeader',
  functional: true,
  props: HeaderViewProps,
  render (h, { props }) {
    const baseClassName = 'ant-pro-top-nav-header'
    console.log('TopNavHeader', props)
    const isTop = props.layout === 'topmenu'
    const contentWidth = props.contentWidth === 'Fixed'
    const { logo, title, theme, isMobile, headerRender, rightContentRender, menuHeaderRender } = props
    const rightContentProps = { theme, isTop, isMobile }

    return (
      <div class={[baseClassName, theme]}>
        <div class={[`${baseClassName}-main`, contentWidth ? 'wide' : '']}>
          {menuHeaderRender && (
            <div class={`${baseClassName}-left`}>
              <div class={`${baseClassName}-logo`} key="logo" id="logo">
                {defaultRenderLogoAntTitle(h, { logo, title, menuHeaderRender })}
              </div>
            </div>
          )}
          <div class={`${baseClassName}-menu`} style={{ flex: 1 }}>
            <BaseMenu {...{ props: props }} />
          </div>
          {isFun(rightContentRender) && rightContentRender(h, rightContentProps) || rightContentRender}
        </div>
      </div>
    )
  }
}
