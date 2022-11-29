from urllib.parse import quote
from sys import stdin, stdout

stdout.write(quote(stdin.buffer.read(), safe="(){},=![]"))
