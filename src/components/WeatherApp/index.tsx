import React, { useState, useEffect, memo, Fragment, useMemo } from 'react';
import axios from 'axios';
import styles from './index.less';
import { translateWeatherDescription } from './config';
import { convertMilliseconds, convertMillisecondsToTime } from '@/utils/utils';
import * as _ from 'lodash-es';
import pinyin from 'pinyin';

const YOU_API_KEY = 'f4efab1249b3ea1c3c089c51595d9608';

const WeatherApp: React.FC<any> = (props: any) => {
    const { style, ...rest } = props;
    const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const fetchWeather = async (city: string) => {
        try {
            const response = await axios.get(`/weather?q=${city}&appid=${YOU_API_KEY}&units=metric`);
            setWeatherData(response.data);
        } catch (err) {
            setError(err);
        }
    };
    // 初始化天气
    useEffect(() => {
        const showPosition = async (position: any) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const ak = 'vqLEG9kv4XCfbObw7x614Fz4cgGhqt5g';
            const url = `/geo/?ak=${ak}&location=${latitude},${longitude}&output=json`;
            try {
                const response = await axios.get(url);
                const data = response.data;
                if (data.status === 0) {
                    const addressComponent = data.result.addressComponent;

                    if (typeof addressComponent.city === 'string' && addressComponent.city.length > 0) {
                        fetchWeather(addressComponent.city);
                    } else {
                        fetchWeather('Beijing');
                        console.error('城市名称无效或为空');
                    }
                } else {
                    console.error('获取城市名失败');
                }
            } catch (error) {
                console.error('请求出错:', error);
            }
        };
        fetchWeather('Beijing');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation 不被支持");
        };
    }, []);

    return <div className={`flex-box-column ${styles.weatherBox}`} style={{ ...style }} {...rest}>
        <div className="flex-box-justify-between weather-time">
            <div className="weather-time-date">
                {convertMilliseconds(new Date().getTime())}
            </div>
            <div className="weather-time-time">
                {convertMillisecondsToTime(new Date().getTime())}
            </div>
        </div>
        {
            !!weatherData ?
                <Fragment>
                    <div className="flex-box weather-content">
                        <div className="weather-content-icon">
                            <img src={`http://openweathermap.org/img/w/${weatherData?.weather?.[0]?.icon}.png`} alt="" />
                        </div>
                        <div className='flex-box-column weather-content-info'>
                            <div className="flex-box weather-content-info-top">
                                <span>{weatherData?.main?.temp}℃</span>
                                {translateWeatherDescription(_.lowerCase(weatherData?.weather?.[0]?.description))}
                            </div>
                            <div className="flex-box weather-content-info-bottom">
                                <div>湿度：{weatherData?.main?.humidity}%</div>
                                <div>|</div>
                                <div>云量：{weatherData?.clouds?.all}%</div>
                            </div>
                        </div>
                    </div>
                </Fragment>
                : null
        }
    </div>
}

export default memo(WeatherApp);