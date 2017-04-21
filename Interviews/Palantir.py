# My advise is to spend 20 mins on the
# problem with no coding, since it is easy to not get the requirements.
# I made this mistake and I paid the price. (Lesson learned)
 
def findFraudolentTraders(datafeed):
    fradulent_traders = set()
    trades = {}
    price = 0
    for feed in datafeed[1:]:
        line = feed.split("|")
        number_of_days = int(line[0])
        if len(line) == 2:
            price = int(line[1])
            for i in range(number_of_days - 3, number_of_days):
                if i in trades:
                    for val in trades[i]:
                        if val[1]:
                            fraudolent = (price - val[2]) * val[3] >= 5000000
                        else:
                            fraudolent = (val[2] - price) * val[3] >= 5000000
                        if fraudolent:
                            fradulent_traders.add((i, val[0]))
        else:
            name = line[1]
            buy = len(line[2]) == 3
            amount = int(line[3])
            if number_of_days not in trades:
                trades[number_of_days] = []
            trades[number_of_days].append((name, buy, price, amount))
    fradulent_traders = sorted(list(fradulent_traders))
    return list(map(lambda x: str(x[0]) + "|" + str(x[1]), fradulent_traders))
 
 
#Testing
 
feed2 = """16
0|20
0|Kristi|SELL|3000
0|Will|BUY|5000
0|Tom|BUY|50000
0|Shilpa|BUY|1500
1|Tom|BUY|1500000
3|25
5|Shilpa|SELL|1500
8|Kristi|SELL|600000
9|Shilpa|BUY|500
10|15
11|5
14|Will|BUY|100000
15|Will|BUY|100000
16|Will|BUY|100000
17|25"""
 
datafeed2 = feed2.split("\n")
 
trader =  findFraudolentTraders(datafeed2)
for tr in trader:
    f.write(str(tr)+"\n")

f.close()