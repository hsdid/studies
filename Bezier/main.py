

import BezierCurve
import pygame
pygame.init()


# Points
p = [{"x": 200, "y": 350}, {"x": 200, "y": 50}, {"x": 250, "y": 50}]
p1 = [{"x": 250, "y": 50}, {"x": 300, "y": 100}, {"x": 300, "y": 150}]
p2 = [{"x": 300, "y": 150}, {"x": 300, "y": 100}, {"x": 350 , "y": 50}]
p3 = [{"x": 350, "y": 50}, {"x": 400, "y": 50}, {"x": 400, "y": 350}]

BLUE = (0, 0, 255)

screen = pygame.display.set_mode([900, 500])
c1 = BezierCurve.BezierCurve(p, BLUE, screen, pygame)
c2 = BezierCurve.BezierCurve(p1, BLUE, screen, pygame)
c3 = BezierCurve.BezierCurve(p2, BLUE, screen, pygame)
c4 = BezierCurve.BezierCurve(p3, BLUE, screen, pygame)
running = True

while running:

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill((255, 255, 255))

    c1.setup_bezier()
    c1.draw_curve()
    c2.setup_bezier()
    c2.draw_curve()
    c3.setup_bezier()
    c3.draw_curve()
    c4.setup_bezier()
    c4.draw_curve()
    pygame.display.flip()
