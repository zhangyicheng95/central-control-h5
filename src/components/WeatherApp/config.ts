
/** 
**请求链接**
https://api.openweathermap.org/data/2.5/weather?q=${YOU_LOCATION}&appid=${YOU_API_KEY}&units=metric
**请求参数**
{
    q: 城市名 // Beijing, Hebei
    appid: 自己申请的key（百度搜 openweathermap key申请）
    units: metric中国单位（摄氏度，百米/秒），imperial英国单位（华氏度，英里/小时），不写默认开尔文单位
}
**示例响应：**
{
    "dt": 1605205200,
    "main": {
        "temp": 287.55,
        "feels_like": 284.22,
        "temp_min": 286.97,
        "temp_max": 287.55,
        "pressure": 1018,
        "sea_level": 1018,
        "grnd_level": 1014,
        "humidity": 87,
        "temp_kf": 0.58
    },
    "weather": [{"id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d"}],
    "clouds": {"all": 40},
    "wind": {"speed": 4.22, "deg": 209},
    "visibility": 10000,
    "pop": 0,
    "sys": {"pod": "d"},
}

#### 字段说明
- **dt**: 数据的时间（Unix时间戳）。

- **main**:
    - **temp**: 预报温度。
    - **feels_like**: 预报的体感温度。
    - **temp_min**: 预报的最低温度。
    - **temp_max**: 预报的最高温度。
    - **pressure**: 大气压力。
    - **sea_level**: 海平面上的大气压力。
    - **grnd_level**: 地面上的大气压力。
    - **humidity**: 湿度（%）。

- **name**: 城市名。

- **weather** (列表): 天气情况。
    - **id**: 天气情况的ID。
    - **main**: 天气情况（如`Clear`、`Clouds`等）。
    - **description**: 天气情况的描述（如`clear sky`）。
    - **icon**: 天气图标的代码，你可以通过`http://openweathermap.org/img/w/{icon}.png`获取对应的图标。

- **clouds**:
    - **all**: 云量（%）。

- **wind**:
    - **speed**: 风速（单位可以是m/s、km/h等，取决于你的设置）。
    - **deg**: 风向（度）。

- **visibility**: 能见度（米）。

- **pop**: 降水概率（%）。

- **sys**:
    - **type**: 内部参数。
    - **id**: 内部参数。
    - **country**: 国家代码（ISO 3166格式）。
    - **sunrise**: 日出时间（Unix时间戳）。
    - **sunset**: 日落时间（Unix时间戳）。
**/

const weatherDescriptions: any = {
    "clear sky": "晴空",
    "few clouds": "少云",
    "scattered clouds": "零散的云",
    "broken clouds": "多云",
    "shower rain": "阵雨",
    "rain": "雨",
    "thunderstorm": "雷雨",
    "snow": "雪",
    "mist": "薄雾",
    "smoke": "烟雾",
    "haze": "霾",
    "dust": "扬尘",
    "fog": "大雾",
    "sand": "沙尘",
    "ash": "火山灰",
    "squall": "飑",
    "tornado": "龙卷风",
    "few clouds: 11-25%": "少云：11-25%",
    "scattered clouds: 25-50%": "零散的云：25-50%",
    "broken clouds: 51-84%": "多云：51-84%",
    "overcast clouds: 85-100%": "阴云：85-100%",
    "overcast clouds": "阴云",
    "light rain": "小雨",
    "moderate rain": "中雨",
    "heavy intensity rain": "大雨",
    "very heavy rain": "非常大的雨",
    "extreme rain": "极端的雨",
    "light intensity shower rain": "小阵雨",
    "heavy intensity shower rain": "大阵雨",
    "ragged shower rain": "不规则阵雨",
    "light snow": "小雪",
    "heavy snow": "大雪",
    "sleet": "雨夹雪",
    "light shower sleet": "小阵雨夹雪",
    "shower sleet": "阵雨夹雪",
    "light rain and snow": "小雨和雪",
    "rain and snow": "雨和雪",
    "light shower snow": "小阵雪",
    "shower snow": "阵雪",
    "heavy intensity rain and snow": "大雨和雪",
    "heavy shower snow": "大阵雪",
    "light drizzle": "小毛毛雨",
    "drizzle": "毛毛雨",
    "heavy intensity drizzle": "大毛毛雨",
    "light intensity drizzle rain": "小毛毛雨和雨",
    "drizzle rain": "毛毛雨和雨",
    "heavy intensity drizzle rain": "大毛毛雨和雨",
    "shower drizzle": "阵毛毛雨",
    "light shower rain and snow": "小阵雨和雪",
    "heavy shower rain and snow": "大阵雨和雪",
    "freezing rain": "冻雨",
};

export function translateWeatherDescription(description: string) {
    return weatherDescriptions[description.toLowerCase()] || description;
};