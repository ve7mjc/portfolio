import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import { Link } from 'gatsby';
import { Container, Flex } from '../UI';
import HeaderToggle from './HeaderToggle';
import HeaderLinks from './HeaderLinks';
import Logo from '../../assets/images/logo.svg';
import presets from '../../utils/presets';
import supportsPassiveEvents from '../../utils/supportsPassiveEvents';

const propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  openMobileMenu: PropTypes.func,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      bgHeader: PropTypes.string,
    }),
  }),
};

const HeaderInner = styled(Flex)`
  width: 100%;
  height: ${p => p.theme.headerHeight};
`;

const HeaderLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  color: ${p => p.theme.colors.headingColor};
`;

class Header extends Component {
  windowWidth = 0;

  resizeEventOptions = false;

  state = {
    headroomActive: false,
  };

  componentDidMount = () => {
    if (supportsPassiveEvents()) {
      this.resizeEventOptions = { passive: true, capture: false };
    }

    this.getWindowWidth();

    window.addEventListener(
      'resize',
      this.getWindowWidth,
      this.resizeEventOptions
    );
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { theme } = this.props;
    const { headroomActive } = this.state;
    const themeChanged =
      theme.colors.bgHeader !== nextProps.theme.colors.bgHeader;
    const stateChanged = headroomActive !== nextState.headroomActive;

    if (!themeChanged && !stateChanged) {
      return false;
    }

    return true;
  }

  componentWillUnmount = () => {
    window.removeEventListener(
      'resize',
      this.getWindowWidth,
      this.resizeEventOptions
    );
  };

  getWindowWidth = () => {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth < 992) {
      this.setState({ headroomActive: false });
    } else {
      this.setState({ headroomActive: true });
    }
  };

  render() {
    const { links, openMobileMenu, theme } = this.props;
    const { headroomActive } = this.state;

    return (
      <Headroom
        tag="header"
        disable={!headroomActive}
        pinStart={500}
        downTolerance={5}
        calcHeightOnResize={false}
        wrapperStyle={{
          width: '100%',
          height: 58,
          minHeight: 58,
        }}
        style={{
          position: 'fixed',
          height: 58,
          backgroundColor: theme.colors.bgHeader,
          WebkitTransition: 'transform 0.3s ease',
          MozTransition: 'transform 0.3s ease',
          OTransition: 'transform 0.3s ease',
          transition: 'transform 0.3s ease',
          zIndex: 10,
        }}
        itemScope
        itemType="http://schema.org/SiteNavigationElement"
      >
        <Container fluid>
          <HeaderInner alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" css={{ height: '100%' }}>
              <HeaderToggle onClick={openMobileMenu} />
              <HeaderLink
                to="/"
                css={{ marginLeft: 24, [presets.lg]: { marginLeft: 0 } }}
              >
                <Logo />
              </HeaderLink>
            </Flex>
            <HeaderLinks links={links} />
          </HeaderInner>
        </Container>
      </Headroom>
    );
  }
}

Header.propTypes = propTypes;

export default withTheme(Header);
