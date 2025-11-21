#!/usr/bin/env python3
"""
Lightweight metrics web server for Debian-based hosts.
Exposes basic CPU/RAM/disk/network info on port 9999 by default.
"""

import json
import os
import socket
import time
from http.server import BaseHTTPRequestHandler, HTTPServer


PORT = int(os.environ.get("METRICS_PORT", "9999"))
HOST = os.environ.get("METRICS_HOST", "0.0.0.0")


def read_load():
  with open("/proc/loadavg", "r", encoding="utf-8") as f:
    load1, load5, load15 = f.read().split()[:3]
  return {
    "1min": float(load1),
    "5min": float(load5),
    "15min": float(load15),
  }


def read_mem():
  meminfo = {}
  with open("/proc/meminfo", "r", encoding="utf-8") as f:
    for line in f:
      key, value = line.split(":")
      meminfo[key] = value.strip()
  total = int(meminfo["MemTotal"].split()[0]) * 1024
  free = int(meminfo["MemAvailable"].split()[0]) * 1024
  return {
    "total_bytes": total,
    "free_bytes": free,
    "free_human": bytes_to_human(free),
  }


def read_disk(path="/"):
  stat = os.statvfs(path)
  total = stat.f_frsize * stat.f_blocks
  free = stat.f_frsize * stat.f_bavail
  return {
    "mount": path,
    "total_bytes": total,
    "free_bytes": free,
    "free_human": bytes_to_human(free),
  }


def read_uptime():
  with open("/proc/uptime", "r", encoding="utf-8") as f:
    uptime_seconds = float(f.read().split()[0])
  return uptime_seconds


def bytes_to_human(num):
  step = 1024.0
  units = ["B", "KB", "MB", "GB", "TB", "PB"]
  for unit in units:
    if num < step:
      return f"{num:3.1f} {unit}"
    num /= step
  return f"{num:.1f} EB"


def load_metrics():
  return {
    "hostname": socket.gethostname(),
    "timestamp": time.time(),
    "uptime_seconds": read_uptime(),
    "load_avg": read_load(),
    "memory": read_mem(),
    "disk": read_disk("/"),
  }


class MetricsHandler(BaseHTTPRequestHandler):
  def do_GET(self):
    if self.path not in ("/", "/metrics"):
      self.send_response(404)
      self.end_headers()
      self.wfile.write(b"Not Found")
      return

    payload = json.dumps(load_metrics()).encode("utf-8")
    self.send_response(200)
    self.send_header("Content-Type", "application/json")
    self.send_header("Content-Length", str(len(payload)))
    self.end_headers()
    self.wfile.write(payload)

  def log_message(self, format, *args):
    # Silence default HTTP server logging
    return


def main():
  server = HTTPServer((HOST, PORT), MetricsHandler)
  print(f"[metrics-server] listening on {HOST}:{PORT}")
  try:
    server.serve_forever()
  except KeyboardInterrupt:
    pass
  finally:
    server.server_close()


if __name__ == "__main__":
  main()
