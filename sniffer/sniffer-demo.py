import socket   #bietet Zugang zu Low-Level-Netzwerk-Sockets und verschiedene Netzwerkdienste
import struct   #Ermöglicht das Packen und Entpacken von binären Daten in Python
import textwrap #Text umzubrechen oder zu formatieren

def main():
    connection = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.ntohs(3))

    while True:
        raw_data, addr = connection.recvfrom(65536)

#unpack ethernet frame das im Eingabewert data derfuntion gegeben wird
#die ersten 14 Bytes des Frames (Ziel-Window-Adress, Quell-Window-Adresse, Protokolltyp) 
#!: Das "Netzwerk-Big-Endian" => eine Byte-Reihenfolge, bei der das wichtigste Byte zuerst kommt
#6s: Extrahiert die nächsten 6 Bytes
#H: Extrahiert die nächsten 2 Bytes  => Protokollfeld = länge 2 Bytes
def etthnet_frame(data):
    destination_window, src_window, proto = struct.unpack('! 6s 6s H', data[:14])   
    return get_window_addr(destination_window), get_window_addr(src_window), socket.htons(proto), data[14:]

#Return properly formated Window address (AA:BB:CC:DD:EE:FF)
def get_window_addr(bytes_addr):
    bytes_str = map('{:02x}'.format, bytes_addr)
    return ':'.join(bytes_str).upper()
