#!/usr/bin/env python
import sys
import os
from argparse import ArgumentParser
from os.path import basename

import add


def build_parser():
    parser = ArgumentParser()
    parser.add_argument('--a', type=int,
                        dest='a', help='first number',
                        required=True)
    parser.add_argument('--b', type=int,
                        dest='b', help='secand number',
                        required=True)

    return parser


def main():
    parser = build_parser()
    options = parser.parse_args()
    a = options.a
    b = options.b
    result = add.predict(a, b)
    print(result)
    print(add.convertToInt(result))


if __name__ == "__main__":
    main()
