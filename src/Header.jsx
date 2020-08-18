import './Header.less'

import 'ant-design-vue/es/layout/style'
import Layout from 'ant-design-vue/es/layout'

import PropTypes from 'ant-design-vue/es/_util/vue-types'
import { SiderMenuProps } from './components/SiderMenu/SiderMenu'
import GlobalHeader, { GlobalHeaderProps } from './components/GlobalHeader'
import { VueFragment } from './components'
import TopNavHeader from './components/TopNavHeader'

const { Header } = Layout

export const HeaderViewProps = {
  ...GlobalHeaderProps,
  ...SiderMenuProps,
  isMobile: PropTypes.bool.def(false),
  collapsed: PropTypes.bool,
  logo: PropTypes.any,
  hasSiderMenu: PropTypes.bool,
  autoHideHeader: PropTypes.bool,
  menuRender: PropTypes.any,
  headerRender: PropTypes.any,
  rightContentRender: PropTypes.any,
  visible: PropTypes.bool.def(true),
}

const renderContent = (h, props) => {
  const isTop = props.layout === 'topmenu'
  const { isMobile, theme, headerRender } = props
  console.log('props', props)
  let defaultDom = <GlobalHeader {...{ props: props }} />
  if (isTop && !isMobile) {
    defaultDom = (
      <TopNavHeader
        theme={theme}
        mode="horizontal"
        {...{ props: props }}
      />
    )
  }
  if (headerRender) {
    return headerRender(h, props)
  }
  return defaultDom
}

const HeaderView = {
  name: 'HeaderView',
  props: HeaderViewProps,
  render (h) {
    const {
      visible,
      isMobile,
      layout,
      collapsed,
      siderWidth,
      fixedHeader,
      autoHideHeader,
      hasSiderMenu,
    } = this.$props
    const props = this.$props
    const isTop = layout === 'topmenu'

    const needSettingWidth = fixedHeader && hasSiderMenu && !isTop && !isMobile

    const className = {
      'ant-pro-fixed-header': fixedHeader,
      'ant-pro-top-menu': isTop,
    }

    // 没有 <></> 暂时代替写法
    return (
      visible ? (
        <VueFragment>
          { fixedHeader && <Header style={{
            height: '48px',
            lineHeight: '48px',
          }}/>}
          <Header
            style={{
              padding: 0,
              height: '48px',
              lineHeight: '48px',
              width: needSettingWidth
                ? `calc(100% - ${collapsed ? 80 : siderWidth}px)`
                : '100%',
              zIndex: 9,
              right: fixedHeader ? 0 : undefined
            }}
            class={className}
          >
            {renderContent(h, props)}
          </Header>
        </VueFragment>
      ) : null
    )
  }
}

export default HeaderView
