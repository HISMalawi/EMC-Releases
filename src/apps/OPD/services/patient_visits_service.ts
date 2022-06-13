import { Service } from '@/services/service';
import dayjs from 'dayjs';
import Strings from '../utils/Strings';

export default class PatientVisitsService extends Service {
  
  constructor() {
    super()
  }

  static getStatistics() {
    return super.getJsonSWR('dashboard_stats', {
      date: super.getSessionDate(),
      'program_id': super.getProgramID()
    })
  }

  static getTodaysPatientVisits(data: any) {
    const keys = Object.keys(data)
    let total = 0
    const visits: Array<any> = []

    keys.forEach(key => {
      visits.push({
        label: Strings.capitalizeFirstLetter(key.replace('_', ' ')),
        value: data[key],
        color: 'lightyellow'
      })

      total += data[key]
    })

    visits.push({
      label: 'Total',
      value: total,
      color: 'yellowgreen'
    })

    return visits
  }

  static getAccumulativePatientVisits(data: any) {
    const visitTypes = Object.keys(data)
    const keys = Object.keys(data[visitTypes[0]])
    const days: Array<string> = []
    const visits: Array<any> = []

    for (const type in visitTypes) {
      const counts: Array<number> = []

      for (const key in keys) {        
        const date = data[visitTypes[type]][keys[key]].start_date
        const formattedDate = dayjs(date).format("MMM/YYYY")
        if(formattedDate !== days[key]) days.push(formattedDate)

        counts.push(data[visitTypes[type]][keys[key]].count)
      }

      visits.push({
        name: Strings.capitalizeFirstLetter(visitTypes[type]),
        data: counts
      })
    }

    return {
      days,
      visits
    }
  }

  static getRespiratory() {
    return super.getJsonSWR('/dashboard_stats_for_syndromic_statistics',{
      date: super.getSessionDate(),
      'program_id': super.getProgramID()
    })
  }
  
  static getAccumulativePatietRespiratoryComplaints(stats: any) {

      let chartKeys: Array<any> = []
      const chartData = stats
      const dates: Array<string> = []
      const ILI: number[] = [];
      const Respiratory: number[] = [];
      let categories: any = []
  
      const series: any = [
        {
          name: "Influenza Like Illness ",
          data: [0, 0, 0, 0, 0,0, 0, 0, 0, 0,0,0,0],
        },
        {
          name: "Respiratory",
          data: [0, 0, 0, 0, 0,0, 0, 0, 0, 0,0,0,0],
        },
       
      ]

      for(let key in chartData){
        const keys = chartData[key];
        for(key in keys){
          chartKeys.push(parseInt(key));
        }
        break;
      }

    chartKeys = chartKeys.sort((a, b) => {return a-b});
    const types = ['ILI','Respiratory'];
    const numbers: any = {};

    for(let i = 0 ; i < chartKeys.length ; i++){
      const sdate = (chartData[types[0]][chartKeys[i]].start_date);
      const formattedDate = dayjs(sdate).format("MMM/YYYY")
      dates.push(formattedDate)
    }

    for(let i = 0 ; i < dates.length ; i++)
    {
      for(const name in chartData){
        const attr = chartData[name];
        for(const key in attr){
          const sdate = chartData[name][key].start_date;
          const formattedDate = dayjs(sdate).format("MMM/YYYY")
          if(formattedDate != dates[i])
            continue;

            if(numbers[name] == undefined)
                numbers[name] = [];

            if(name == 'ILI')
              ILI.push(chartData[name][key].count);
            if(name == 'Respiratory')
              Respiratory.push(chartData[name][key].count);
        }
      }
      series[0].data = [...ILI];
      series[1].data = [...Respiratory];
      categories = [...dates]
    }

    return { 
      categories,
      series
    } 
  }
}