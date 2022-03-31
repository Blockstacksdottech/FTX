import time
import hmac
from requests import Request

ts = int(time.time() * 1000)
request = Request('GET', 'https://ftx.com/api')
prepared = request.prepare()
signature_payload = f'{ts}{prepared.method}{prepared.path_url}'.encode()
signature = hmac.new('YOUR_API_SECRET'.encode(),
                     signature_payload, 'sha256').hexdigest()

prepared.headers['FTX-KEY'] = '79y3RXKnp5_L57oVp1_B2jt_u5Lx6oy4QKuAKRRi'
prepared.headers['FTX-SIGN'] = signature
prepared.headers['FTX-TS'] = str(ts)

print(prepared.headers)
