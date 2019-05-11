import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './index.less'

export default class RegisterModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      username: '',
      repassword: '',
      phone: ''
    }
    this.renderLoginModal = this.renderLoginModal.bind(this)
    this.createNode = this.createNode.bind(this)
    this.handleSubmitRegister = this.handleSubmitRegister.bind(this)
  }

  componentDidMount() {
    this.createNode()
  }

  createNode() {
    if (!this.$el) {
      this.$el = document.createElement('div')
      document.body.appendChild(this.$el)
    }
  }

  handelValueChange(e, key) {
    this.setState({ [key]: e.target.value })
  }

  handleSubmitRegister() {
    const {
      username, password, repassword, phone,
    } = this.state
    const { onSubmitRegister } = this.props
    onSubmitRegister({
      username, password, repassword, phone,
    })
  }

  renderLoginModal() {
    const {
      username, password, phone, repassword,
    } = this.state
    const { onClose, onLogin } = this.props
    return (
      <div className="mask">
        <div className="registerModal">
          <div className="registerHeaderModal">
            <span>注册</span>
            <span className="close" onClick={onClose}>X</span>
          </div>
          <div className="registerContentModal">
            <div className="userName">
              <span>账户名称</span>
              <input
                placeholder="    请输入账户名称"
                onChange={(e) => { this.handelValueChange(e, 'username') }}
                value={username}
              />
            </div>
            <div className="password">
              <span>设置密码</span>
              <input
                placeholder="    请输入密码"
                onChange={(e) => { this.handelValueChange(e, 'password') }}
                value={password}
              />
            </div>
            <div className="password">
              <span>确认密码</span>
              <input
                placeholder="    再次输入密码"
                onChange={(e) => { this.handelValueChange(e, 'repassword') }}
                value={repassword}
              />
            </div>
            {/* <div className="password">
              <span>选择性别</span>
              <input
                placeholder="    请输入密码"
                onChange={(e) => { this.handelValueChange(e, 'password') }}
                value={password}
              />
            </div> */}
            <div className="phone">
              <span>联系电话</span>
              <input
                placeholder="    请输入密码"
                onChange={(e) => { this.handelValueChange(e, 'phone') }}
                value={phone}
              />
            </div>
          </div>
          <div className="register_modal_footer">
            <button className="register_btn" onClick={onLogin}>登录</button>
            <button className="cancel_btn" onClick={onClose}>取消</button>
            <button className="login_btn" onClick={this.handleSubmitRegister}>注册</button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { visible } = this.props
    if (visible) {
      return ReactDOM.createPortal(this.renderLoginModal(), this.$el)
    }
    return null
  }
}

RegisterModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitRegister: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
}
