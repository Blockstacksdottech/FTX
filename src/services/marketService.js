
const marketSort = (result, sort, host) => {
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
                    case 'name':
                        sorting = 1
                        break;
                    case 'volume':
                        sorting = b.volume - a.volume
                        break;
                    case 'price':
                        sorting = b.price - a.price
                        break;
                    case 'change':
                        sorting = b.change - a.change
                        break;
                    case '-name':
                        sorting = -1
                        break;
                    case '-volume':
                        sorting = a.volume - b.volume
                        break;
                    case '-price':
                        sorting = a.price - b.price
                        break;
                    case '-change':
                        sorting = a.change - b.change
                        break;
                    default:
                        sorting = b.volume - a.volume
                        break;
                }
                return sorting;
            })
}


module.exports = {
    marketSort
}