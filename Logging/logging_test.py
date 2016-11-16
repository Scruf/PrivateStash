import logging


logging.basicConfig(filename='logs.log', level=logging.DEBUG, format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p')
logging.debug('This is the test message')
logging.warning('Watch out')
logging.info(' I told you so')