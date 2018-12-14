/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from 'vue';
import Vuex from 'vuex';
import Api from '../api'

Vue.use(Vuex);

const now = new Date();
const store = new Vuex.Store({
    state: {
        // 当前用户
        user: {
            name: 'coffce',
            img: './images/1.jpg'
        },
        // 会话列表
        sessions: [
            {
                id: 'home',
                user: {
                    name: '示例介绍',
                    img: './images/2.png'
                },
                messages: [
                    {
                        content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                        date: now
                    }, {
                        content: '项目地址: https://github.com/coffcer/vue-chat',
                        date: now
                    }
                ]
            },
            {
                id: 2,
                user: {
                    name: 'webpack13',
                    img: './images/3.jpg'
                },
                messages: []
            },
            {
                id: 3,
                user: {
                    name: 'webpack1',
                    img: './images/3.jpg'
                },
                messages: []
            },
            {
                id: 4,
                user: {
                    name: 'webpack2',
                    img: './images/3.jpg'
                },
                messages: []
            }
        ],
        // 当前选中的会话
        currentSessionId: 'home',
        // 过滤出只包含这个key的会话
        filterKey: '',
        crrentConversation:null,
    },
    mutations: {
        INIT_DATA (state) {
            let user = {
                name: 'coffce',
                img: './images/1.jpg'
            }
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        // 发送消息
        SEND_MESSAGE ({ sessions, currentSessionId }, content) {
            let session = sessions.find(item => item.id === currentSessionId);
            session.messages.push({
                content: content,
                date: new Date(),
                self: true
            });
        },
        // 选择会话
        SELECT_SESSION (state, id) {
            state.currentSessionId = id;
        },
        // 搜索
        SET_FILTER_KEY (state, value) {
            state.filterKey = value;
        }
    },
    getters: {
        getter_sessions:({ sessions, filterKey }) => {
            let result = sessions.filter(session => session.user.name.includes(filterKey));
            return result;
        },
        getter_session: ({ sessions, currentSessionId }) => sessions.find(session => session.id === currentSessionId),
    },
    actions: {
        init: ({ commit, state }) => {
            Api.init().then((data) => {
                commit('INIT_DATA')
            })
        },
        sendMessage: ({ commit }, content) => {
            Api.sendMessage('home', content).then((data) => {
                commit('SEND_MESSAGE', data)
            })
        },
        selectSession: ({ commit }, id) => {
            commit('SELECT_SESSION', id)
        },
        search: ({ commit }, value) => {
            commit('SET_FILTER_KEY', value)
        }
    },
});

store.watch(
    (state) => state.sessions,
    (val) => {
        console.log('CHANGE: ', val);
        localStorage.setItem('vue-chat-session', JSON.stringify(val));
    },
    {
        deep: true
    }
);

export default store;

