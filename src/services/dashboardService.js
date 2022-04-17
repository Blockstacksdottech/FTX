const { getFiats } = require('../utils')

const filterResults = async (result, type) => {

    let fiats,
        isFiat;
    if(type === 'fiat'){
        fiats = await getFiats()
    }
    
    return result.filter(item => {
        const { baseCurrency, name, underlying, tokenizedEquity, restricted} = item
        const isLeveraged = baseCurrency?.search("BEAR") >= 0 || baseCurrency?.search("BULL") >= 0
        const isVolatility = name?.search("MOVE") >= 0 || name?.search("VOL") >= 0 || name?.search("Options") >= 0
        const isFuture = underlying !== null
        const isStocks = restricted
        const isPrediction = name.search('/') === -1 && name.search('-') === -1

        if(type === 'fiat'){
            const listFiat = fiats.map(({ name }) => name)
            isFiat = listFiat.includes(name)
        }

        
    
        let filter;
        switch (type) {
            case 'spot':
                filter = item.type === type  && !isLeveraged && !isFuture && !isVolatility && !isStocks
                break;
            case 'future':
                filter = item.type === type  && !isStocks && isFuture && !isVolatility && !tokenizedEquity && !isPrediction
                break;
            case 'stocks':
                filter = isStocks
                break;
            case 'leverage':
                filter = isLeveraged
                break;
            case 'volatility':
                filter =  isVolatility
                break;
            case 'prediction':
                filter =  isPrediction
                break;
            case 'fiat':
                filter =  isFiat
                break;
            default:
                filter = item.type === type && isBear && isBull
                break;
        }
        return filter
      })
}


const sortResults = (result, sort, host) => {
    return result
            .map(({ name, price, changeBod, volumeUsd24h, underlying, baseCurrency}) => ({
                name,
                price,
                change: changeBod,
                volume: volumeUsd24h,
                icon: `${host}/${ underlying || baseCurrency }.png`
            }))
            .sort((a, b) => {
                let sorting;
                switch (sort) {
                    case 'winners':
                    sorting = b.change - a.change
                    break;
                    case 'losers':
                    sorting = a.change - b.change
                    break;
                    case 'volume':
                    sorting = b.volume - a.volume
                    break;
                    default:
                    sorting = b.change - a.change
                    break;
                }
                return sorting;
            })
            .slice(0, 7)
}

const overview = (result) => {
    return result.filter(({ name }) => name === 'FTT/USD' || name === "BTC/USD" || name === "ETH/USD")
                .map(({ name, price, changeBod, volumeUsd24h}) => ({
                    name,
                    price,
                    change: changeBod,
                    volume: volumeUsd24h
                }))
}


const overviewFutures = (result, host) => {
    return result.sort((a, b) => b.volumeUsd24h - a.volumeUsd24h)
                    .map(({ name, marginPrice, changeBod, volumeUsd24h, underlying, baseCurrency}) => ({
                        name,
                        price: marginPrice,
                        change: changeBod,
                        volume: volumeUsd24h,
                        icon: `${host}/${ underlying || baseCurrency }.png`
                    }))
                    .slice(0, 4)

}


module.exports = {
    filterResults,
    sortResults,
    overview,
    overviewFutures
}