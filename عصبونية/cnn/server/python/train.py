#!/usr/bin/env python
import sys
import os
from argparse import ArgumentParser
from os.path import basename

import add


def build_parser():
    parser = ArgumentParser()
    parser.add_argument('--s', type=int,
                        dest='size', help='size of number to train',
                        required=True)
    parser.add_argument('--l', type=int,
                        dest='length', help='length of number',
                        required=True)

    return parser


def main():
    parser = build_parser()
    options = parser.parse_args()
    size = options.size
    length = options.length
    error = add.train(size, length)
    print(error)


if __name__ == "__main__":
    main()
