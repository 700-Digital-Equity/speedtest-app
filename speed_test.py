import speedtest
import json
from ping3 import ping

try:
    s = speedtest.Speedtest()
    s.get_best_server()  # ⚠️ This line is failing
    download = s.download()
    upload = s.upload()
    ping_raw = s.results.ping

    count = 4
    lost = 0
    total_ping = 0
    successful_pings = 0
    for _ in range(count):
        result = ping("www.google.com", timeout=2)
        if result is None:
            lost += 1
        else:
            total_ping += result
            successful_pings += 1

    packet_loss = (lost / count) * 100
    ping_time = (total_ping / successful_pings) * 1000 if successful_pings > 0 else None

    result = {
        "download": round(download / 1_000_000, 2),
        "upload": round(upload / 1_000_000, 2),
        "packet_loss": round(packet_loss, 2),
        "avg_ping": round(ping_time, 2) if ping_time is not None else None
    }

    print(json.dumps(result))
except Exception as e:
    print(json.dumps({"error": str(e)}))
    exit(1)


