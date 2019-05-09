const option = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}',
  },
  series: [
    {
      name: '中国',
      type: 'map',
      zoom: 1.2,
      map: 'china',
      selectedMode: 'single',
      itemStyle: {
        normal: {
          borderWidth: 3,
          borderColor: '#FFFFFF',
          areaColor: '#E6E6E6',
          label: {
            show: true,
          },
        },
      },
      label: {
        normal: {
          show: false,
        },
        emphasis: {
          show: true,
        },
      },
      emphasis: {
        itemStyle: {
          // areaColor: '#FF6A00',
          areaColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#EE0979', // 0% 处的颜色
            }, {
              offset: 1, color: '#FF6A00', // 100% 处的颜色
            }],
            global: false, // 缺省为 false
          },
        },
      },
      data: [
        { name: '北京', value: 11 },
        { name: '天津', value: 12 },
        { name: '河北', value: 13 },
        { name: '山西', value: 14 },
        { name: '内蒙古', value: 15 },
        { name: '辽宁', value: 21 },
        { name: '吉林', value: 22 },
        { name: '黑龙江', value: 23 },
        { name: '上海', value: 31 },
        { name: '江苏', value: 32 },
        { name: '浙江', value: 33 },
        { name: '安徽', value: 34 },
        { name: '福建', value: 35 },
        { name: '江西', value: 36 },
        { name: '山东', value: 37 },
        { name: '河南', value: 41 },
        { name: '湖北', value: 42 },
        { name: '湖南', value: 43 },
        { name: '广东', value: 44 },
        { name: '广西', value: 45 },
        { name: '海南', value: 46 },
        { name: '重庆', value: 50 },
        { name: '四川', value: 51 },
        { name: '贵州', value: 52 },
        { name: '云南', value: 53 },
        { name: '西藏', value: 54 },
        { name: '陕西', value: 61 },
        { name: '甘肃', value: 62 },
        { name: '青海', value: 63 },
        { name: '宁夏', value: 64 },
        { name: '新疆', value: 65 },
      ],
    },
  ],
}

export default option
