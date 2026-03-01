import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, Users, Calendar, DollarSign, Star, MessageCircle, ChevronRight, Search, Filter, Heart, Share2, Info } from 'lucide-react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: '你好！我是徒步指南助手。让我来帮你找到最适合的徒步线路。' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [userLevel, setUserLevel] = useState('');
  const [duration, setDuration] = useState('');
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [travelType, setTravelType] = useState('');

  const hikingRoutes = [
    {
      id: 1,
      name: '黄山云海徒步',
      level: '中阶',
      duration: '2-3天',
      difficulty: '中等',
      distance: '18公里',
      elevation: '1200米',
      rating: 4.8,
      reviews: 234,
      price: '800-1500元',
      features: ['日出云海', '奇松怪石', '文化历史'],
      equipment: ['登山鞋', '登山杖', '保暖衣物', '雨具'],
      transportation: '黄山北站/汤口镇',
      accommodation: '汤口镇酒店/山间客栈',
      description: '黄山是中国著名的山岳景区，以奇松、怪石、云海、温泉"四绝"闻名于世。这条线路适合有一定经验的徒步者，可以欣赏到壮丽的自然风光和丰富的文化底蕴。'
    },
    {
      id: 2,
      name: '武功山高山草甸',
      level: '新手',
      duration: '1-2天',
      difficulty: '简单',
      distance: '12公里',
      elevation: '800米',
      rating: 4.9,
      reviews: 189,
      price: '500-800元',
      features: ['高山草甸', '云中栈道', '星空露营'],
      equipment: ['舒适徒步鞋', '轻便背包', '防晒用品'],
      transportation: '萍乡北站/武功山游客中心',
      accommodation: '山间客栈/露营',
      description: '武功山位于江西，以壮丽的高山草甸和云中栈道闻名。线路相对平缓，适合新手和初级徒步者，沿途风景优美。'
    },
    {
      id: 3,
      name: '四姑娘山长坪沟',
      level: '高手',
      duration: '3-4天',
      difficulty: '困难',
      distance: '35公里',
      elevation: '2000米',
      rating: 4.7,
      reviews: 156,
      price: '1500-2500元',
      features: ['雪山冰川', '高原草甸', '原始森林'],
      equipment: ['专业登山装备', '高海拔装备', '保暖防风衣物'],
      transportation: '成都/小金县',
      accommodation: '专业登山营地',
      description: '四姑娘山是四川省著名的雪山景区，长坪沟线路难度较大，适合有经验的徒步者，可以近距离接触雪山和冰川。'
    }
  ];

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newUserMessage = { type: 'user', text: userInput };
    setChatMessages(prev => [...prev, newUserMessage]);

    // 简单的推荐逻辑
    let response = '';
    if (userInput.includes('推荐') || userInput.includes('线路')) {
      response = '根据你的需求，我推荐以下几条热门线路：\n1. 黄山云海徒步（中阶，2-3天）\n2. 武功山高山草甸（新手，1-2天）\n3. 四姑娘山长坪沟（高手，3-4天）\n请告诉我你的徒步经验水平，我可以给出更精准的推荐。';
    } else if (userInput.includes('新手') || userInput.includes('初级')) {
      response = '对于新手，我推荐武功山高山草甸，难度适中，风景优美，非常适合第一次徒步。';
    } else if (userInput.includes('中阶') || userInput.includes('中级')) {
      response = '中阶徒步者可以选择黄山云海徒步，既有挑战性又能欣赏到壮丽景色。';
    } else if (userInput.includes('高手') || userInput.includes('高级')) {
      response = '高手推荐四姑娘山长坪沟，挑战雪山冰川，体验真正的户外探险。';
    } else {
      response = '我理解你的需求。请告诉我你的徒步经验水平（新手/中阶/高手），以及你希望徒步的时长、预算等信息，这样我可以为你推荐最合适的线路。';
    }

    setTimeout(() => {
      setChatMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 1000);

    setUserInput('');
  };

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 左侧主内容区 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部导航栏 */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </motion.button>
              <h1 className="text-2xl font-bold text-gray-800">徒步指南</h1>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                登录/注册
              </motion.button>
            </div>
          </div>
        </header>

        {/* 主内容 */}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {selectedRoute ? (
              // 线路详情页面
              <motion.div
                key="route-detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto"
              >
                <button
                  onClick={() => setSelectedRoute(null)}
                  className="mb-4 flex items-center text-blue-600 hover:text-blue-700"
                >
                  <ChevronRight className="w-5 h-5 rotate-180 mr-2" />
                  返回线路列表
                </button>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="relative h-64 bg-gradient-to-br from-blue-400 to-blue-600">
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <h2 className="text-4xl font-bold text-white">{selectedRoute.name}</h2>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center text-gray-600 mb-1">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">难度</span>
                        </div>
                        <span className="font-semibold text-gray-800">{selectedRoute.difficulty}</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center text-gray-600 mb-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm">时长</span>
                        </div>
                        <span className="font-semibold text-gray-800">{selectedRoute.duration}</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center text-gray-600 mb-1">
                          <DollarSign className="w-4 h-4 mr-2" />
                          <span className="text-sm">预算</span>
                        </div>
                        <span className="font-semibold text-gray-800">{selectedRoute.price}</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center text-gray-600 mb-1">
                          <Star className="w-4 h-4 mr-2" />
                          <span className="text-sm">评分</span>
                        </div>
                        <span className="font-semibold text-gray-800">{selectedRoute.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">线路描述</h3>
                        <p className="text-gray-600 leading-relaxed">{selectedRoute.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">特色亮点</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedRoute.features.map((feature, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">装备建议</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-600">{selectedRoute.equipment.join('、')}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">交通与住宿</h3>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-700">交通方式</h4>
                            <p className="text-gray-600">{selectedRoute.transportation}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700">住宿建议</h4>
                            <p className="text-gray-600">{selectedRoute.accommodation}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 mr-2" />
                          咨询详情
                        </button>
                        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                          <Share2 className="w-5 h-5 mr-2" />
                          分享线路
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              // 线路列表页面
              <motion.div
                key="route-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-6xl mx-auto"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">热门徒步线路</h2>
                  <p className="text-gray-600">发现最适合你的徒步体验</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hikingRoutes.map((route) => (
                    <motion.div
                      key={route.id}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                      onClick={() => handleRouteClick(route)}
                    >
                      <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative">
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <h3 className="text-2xl font-bold text-white">{route.name}</h3>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {route.level}
                          </span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="ml-1 text-sm font-medium">{route.rating}</span>
                            <span className="ml-1 text-xs text-gray-500">({route.reviews})</span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{route.duration}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{route.distance} • {route.elevation}海拔</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <DollarSign className="w-4 h-4 mr-2" />
                            <span>{route.price}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {route.features.slice(0, 2).map((feature, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>

                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          查看详情
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* 右侧聊天栏 */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">徒步助手</h3>
          <p className="text-sm text-gray-600">实时咨询与推荐</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="输入你的问题..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              发送
            </button>
          </div>
        </div>
      </div>

      {/* 移动端侧边栏 */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="w-80 bg-white h-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">菜单</h3>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <nav className="space-y-4">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">首页</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">线路推荐</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">装备指南</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">同行搭子</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">关于我们</a>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
