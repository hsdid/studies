import time


class BezierCurve:

    def __init__(self, punkty, color, screen, pygame, t=0, list = []):
        self.punkty = punkty
        self.prev_x = punkty[0]['x']
        self.prev_y = punkty[0]['y']
        self.screen = screen
        self.pygame = pygame
        self.t = t
        self.color = color
        self.list = list

    def find_next_bt(self):
        """Computes the next iteration point of quadratic bezier curve
        """

        x = (1 - self.t) * (1 - self.t) * self.punkty[0]['x'] + 2 * (1 - self.t) * self.t * self.punkty[1][
            'x'] + self.t * self.t * self.punkty[2]['x']

        y = (1 - self.t) * (1 - self.t) * self.punkty[0]['y'] + 2 * (1 - self.t) * self.t * self.punkty[1][
            'y'] + self.t * self.t * self.punkty[2]['y']
        return x, y

    def setup_bezier(self):
        for i in range(3):
            self.pygame.draw.circle(self.screen, self.color, (self.punkty[i].get("x"), self.punkty[i].get("y")), 5)

        self.pygame.draw.line(self.screen, self.color, (self.punkty[0]['x'], self.punkty[0]['y']),
                              (self.punkty[1]['x'], self.punkty[1]['y']))
        self.pygame.draw.line(self.screen, self.color, (self.punkty[1]['x'], self.punkty[1]['y']),
                              (self.punkty[2]['x'], self.punkty[2]['y']))

    def tab(self):
        next_x, next_y = self.find_next_bt()
        self.list.append([self.prev_x, self.prev_y, next_x, next_y])
        self.prev_x = next_x
        self.prev_y = next_y
        self.t += 0.01

    def draw_curve(self):

        if self.t < 1:
            self.tab()
        else:
            for i in self.list:
                self.pygame.draw.line(self.screen, self.color, (i[0], i[1]), (i[2], i[3]), 5)





