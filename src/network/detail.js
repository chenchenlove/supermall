import {request} from './request'

export function getDetailInformation(iid){
    return request({
        url:'/detail',
        params:{
            iid
        }
    })
}